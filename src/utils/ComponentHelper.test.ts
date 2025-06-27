import { getThemeModeClass } from './ComponentHelper';

describe('getThemeModeClass', () => {
    it('should return "dark-mode" when themeMode is "dark"', () => {
        const themeMode = 'dark';
        const result = getThemeModeClass(themeMode);
        expect(result).toBe('dark-mode');
    });

    it('should return "light-mode" when themeMode is not "dark"', () => {
        const themeMode = 'light';
        const result = getThemeModeClass(themeMode);
        expect(result).toBe('light-mode');
    });
});

