const url = "https://686523b85b5d8d03397fe29b.mockapi.io/products/products";

export const fetchProducts = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("api response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
