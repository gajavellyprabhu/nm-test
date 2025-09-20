export const pushLayer = (serviceName, serviceValue) => {
  if (typeof window !== 'undefined' && window?.dataLayer && serviceValue) {
    let dataLayerObject = {};
    dataLayerObject[serviceName] = serviceValue;
    return window?.dataLayer?.push(dataLayerObject);
  }
};
export const pushLayerEvent = (serviceName, serviceValue) => {
  if (typeof window !== 'undefined' && window?.dataLayer && serviceValue) {
    let dataLayerObject = {};
    dataLayerObject[serviceName] = serviceValue;
    return window?.dataLayer?.push({
      event: serviceName,
      selectedText: serviceValue,
    });
  }
};

export const pushLayerObject = (object) => {
  if (typeof window !== 'undefined' && !!window?.dataLayer) {
    // let dataLayerObject = {};
    // dataLayerObject[serviceName] = serviceValue;
    return window?.dataLayer?.push(object);
  }
};
