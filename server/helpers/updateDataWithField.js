module.exports = ({dataRawSource, dataRawKey}, {dataToAddSource, dataToAddKey}, keyName) => {
    const data = dataRawSource.map((dataRaw) => {
      const item = dataToAddSource.find((dataToAdd) => dataToAdd[dataToAddKey] === dataRaw[dataRawKey]);
      if (item) {
        return Object.assign(dataRaw, {[keyName]: item});
      } else {
        return null;
      }
    });
    return data.every((d) => d !== null) ? data : null;
  };