const fs = require('fs');

const PhoneLogs = {
    updateOrCreatePhoneLog: (phoneNumber, newValue) => {
        const { number } = newValue;
        let PhoneLog = phoneNumber.get(number) || { number, logs: [], };
        PhoneLog.logs = [...PhoneLog.logs, newValue];
        return PhoneLog;
    },
    getPhoneLogsMap: () => new Promise((resolve, reject) => {
        fs.readFile('json-data/logs.json', (err, data) => {
            if (err) reject(err);
            const logs = JSON.parse(data);
            const phoneLogsMap = new Map();
            logs.forEach((value) => {
                const { number } = value;
                phoneLogsMap.set(number, PhoneLogs.updateOrCreatePhoneLog(phoneLogsMap, value));
            })
            resolve(phoneLogsMap);
        });
    }),
    getPhoneNumberFromLogs: () => new Promise((resolve, reject) => {
        PhoneLogs.getPhoneLogsMap().then((phoneLogsMap) => {
            resolve(Array.from(phoneLogsMap.values()));
        });
    }),
    getPhoneNumbers: (req, res) => {
        PhoneLogs.getPhoneNumberFromLogs().then((phoneLogs, reject) => {
            res.json({ phoneLogs });
        });
    },
};

module.exports = PhoneLogs;