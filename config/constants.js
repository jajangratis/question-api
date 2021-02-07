exports.templateResponse = (status, success, msg, data, error) => {
    return {
        status,
        success,
        msg,
        data,
        error
    }
}

exports.invalidParameter = () => {
    return this.templateResponse(400, false, 'invalid_parameter')
}

exports.unauthorized =  () => {
    return this.templateResponse(401, false, 'unauthorized')
}

exports.okSample = (data) => {
    return this.templateResponse(200, true, 'ok', data)
}

exports.systemError = (status, error) => {
    return this.templateResponse(500, false, 'system_error', "", error)
}


exports.responseCode = {
    BADREQUEST:400,
    OK:200,
    UNAUTHORIZED: 401
}

exports.responseSuccess = {
    FALSE:false,
    TRUE: true
}