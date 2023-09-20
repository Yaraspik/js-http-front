const loader = document.querySelector('.loader');

const createRequest = async (options = {}) => {
  loader.show();
  const url = 'http://localhost:3000';

  const response = await fetch(url + options.query, {
    method: options.method,
    body: options.body,
  });

  if (response.ok) {
    const json = await response.json().catch(() => null);
    loader.close();
    return json;
  }

  console.log(`Ошибка HTTP: ${response.status}`);
  loader.close();
  return false;
};

export default createRequest;
