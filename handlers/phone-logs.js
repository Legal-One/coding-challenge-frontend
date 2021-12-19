const PhoneLogs = {

    updateOrCreatePhoneLog: (phoneNumber, newValue) => {
        const { number } = newValue;
        let PhoneLog = phoneNumber.get(number) || { number, logs: [], };
        PhoneLog.logs = [...PhoneLog.logs, newValue];
        return PhoneLog;
    },
};

module.exports = PhoneLogs;