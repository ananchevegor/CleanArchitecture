import calculateDiscaunt from '../utils';

describe('calculate function ', () => {
    it('правильный расчет цены со скидкой', () => {
        expect(calculateDiscaunt(100, 20)).toBe(80)
    });

    it('возвращает исходную цену, если скидка 0%', () => {
        expect(calculateDiscaunt(50, 0)).toBe(50);
    });

    it('возвращает 0, если скидка 100%', () => {
        expect(calculateDiscaunt(200, 100)).toBe(0);
    });

    it('выбрасывает ошибку при отрицательной цене', () => {
        // Чтобы протестировать ошибку, вызов функции нужно обернуть в коллбек
        expect(() => calculateDiscaunt(-10, 20)).toThrow('Некорректные данные');
    });

    it('выбрасывает ошибку, если скидка больше 100%', () => {
        expect(() => calculateDiscaunt(100, 150)).toThrow('Некорректные данные');
    });
})
