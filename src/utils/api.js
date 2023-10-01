import { BASE_URL } from "../common/constants";

const getResource = async (endpoint) => {
  let response,
    responseJson,
    errors = [];
  try {
    response = await fetch(`${BASE_URL}${endpoint}`);
  } catch (error) {
    errors.push(`Fetch error: ${error}`);
  }

  if (response?.ok) {
    try {
      responseJson = await response.json();
    } catch (error) {
      errors.push(`Json parse error: ${error}`);
    }
  } else {
    errors.push(`Http response error: ${response?.status}`);
  }
  return { response: responseJson, errors };
};

export default getResource;
