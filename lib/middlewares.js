import { auth } from 'utils/dbConnect';

export function withAuthAdmin(handler) {
    return async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                errors: {
                    status: 401,
                    code: 1,
                    message: 'Not authenticated. No Auth header',
                },
            });
        }

        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = await auth.verifyIdToken(token);
            if (!decodedToken || !decodedToken.uid) {
                return res.status(401).json({
                    success: false,
                    errors: {
                        status: 401,
                        code: 1,
                        message: 'Not authenticated',
                    },
                });
            }
            if (!decodedToken.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
                return res.status(401).json({
                    success: false,
                    errors: {
                        status: 401,
                        code: 1,
                        message: 'Not authorized',
                    },
                });
            }
        } catch (error) {
            const err = {};
            const errorCode = error.errorInfo.code;
            err.status = 401;
            if (errorCode === 'auth/internal-error') {
                err.status = 500;
            }
            // TODO handlle firebase admin errors in more detail
            return res.status(err.status).json({
                errors: {
                    ...err,
                    ...error.errorInfo,
                },
            });
        }

        return handler(req, res);
    };
}

export function withAuth(handler) {
    return async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                errors: {
                    status: 401,
                    code: 1,
                    message: 'Not authenticated. No Auth header',
                },
            });
        }

        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = await auth.verifyIdToken(token);
            if (!decodedToken || !decodedToken.uid) {
                return res.status(401).json({
                    success: false,
                    errors: {
                        status: 401,
                        code: 1,
                        message: 'Not authenticated',
                    },
                });
            }
        } catch (error) {
            console.log(error.errorInfo);
            const errorCode = error.errorInfo.code;
            error.status = 401;
            if (errorCode === 'auth/internal-error') {
                error.status = 500;
            }
            // TODO handlle firebase admin errors in more detail
            return res.status(error.status).json({
                errors: errorCode,
            });
        }

        return handler(req, res);
    };
}
