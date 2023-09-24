class Service {
    static handleSuccess = ({
        data = undefined,
        message = "Request Successful",
        statusCode = 200,
        isError = false,
    }) => {
        return {
            success: true,
            data,
            message,
            statusCode,
            isError,
        };
    };

    static handleError = ({
        message = "Request Failed",
        statusCode = 500,
        isError = true,
    }) => {
        return {
            success: false,
            message,
            statusCode,
            isError,
        };
    };
    static handleRedirect = ({ url = undefined }) => {
        return {
            success: true,
            url,
        };
    };
}

module.exports = Service;
