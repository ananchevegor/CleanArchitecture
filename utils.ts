const calculateDiscaunt = (price: number, discount: number) => {
    if (price < 0 || discount < 0 || discount > 100) {
    throw new Error('Некорректные данные');
  }
  return price - (price * (discount / 100));
}

export default calculateDiscaunt;