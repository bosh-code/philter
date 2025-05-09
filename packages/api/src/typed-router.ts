import {
    ErrorResponseBase,
    Request,
    RequestBase,
    RequestMethodFor,
    Response,
    ResponseBase,
    Routes
} from "@philter/common";

import UniversalRouterSync from "universal-router/sync";

/**
 * Custom context object interface.
 */
interface CustomContext {
    content: RequestBase;
}

/**
 * Utility function for validating a context object that universal-router passes
 * to each route handler.
 */
function isValidContext<Path extends keyof Routes>(
    context: unknown
): context is { content: Request<Path> } {
    return (
        typeof context === "object" && context !== null && "content" in context
    );
}

export type RouteHandler<
    Path extends keyof Routes,
    Method extends RequestMethodFor<Path>
> = (
    request: Request<Path, Method>
) => Response<Path, Method> | ErrorResponseBase;

/**
 * Creates a route for typed-router in a declarative, type-safe manner.
 */
export function createRoute<Path extends keyof Routes>(
    path: Path,
    handlers: { [Method in RequestMethodFor<Path>]: RouteHandler<Path, Method> }
) {
    return {
        path,
        action(context: unknown) {
            if (!isValidContext<Path>(context)) {
                throw new Error("Invalid context");
            }

            const method = context.content.method;
            if (Object.prototype.hasOwnProperty.call(handlers, method)) {
                const handler = handlers[method as keyof typeof handlers];
                return handler(context.content);
            } else {
                return {
                    error: {
                        code: 405,
                        message: "Method not allowed",
                        content: JSON.stringify(context.content)
                    }
                };
            }
        }
    };
}

/**
 * Factory function for typed-router, accepting explicit parameters.
 */
export function createRouter(
    routes: ReturnType<typeof createRoute> | ReturnType<typeof createRoute>[],
    options?: any
) {
    return new UniversalRouterSync<ResponseBase, CustomContext>(
        routes,
        {
            errorHandler(error) {
                return {error: {code: error.status || 500, message: error.message}};
            },
            ...options
        }
    );
}
