export const getUser = async token => {
  try {
    const data = { id: 1, name: 'Peter' };
    return { data };
  } catch (error) {
    return { error };
  }
};

export const registerUser = async () => {
  try {
    const data = { token: '123456' };
    return { data };
  } catch (error) {
    return { error };
  }
};

export const loginUser = async () => {
  try {
    const data = { token: '123456' };
    return { data };
  } catch (error) {
    return { error };
  }
};
