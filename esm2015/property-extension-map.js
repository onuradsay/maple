import { MapleColorHelper } from './helpers/color.helper';
export const MAPLE_PROP_EXTENSION_MAP = {
    'margin-x': (val, important) => `margin-left:${val} ${important};margin-right:${val} ${important};`,
    'margin-y': (val, important) => `margin-top:${val} ${important};margin-bottom:${val} ${important};`,
    'padding-x': (val, important) => `padding-left:${val} ${important};padding-right:${val} ${important};`,
    'padding-y': (val, important) => `padding-top:${val} ${important};padding-bottom:${val} ${important};`,
    link: (val, important) => `
    color:${val} ${important};
  `,
    theme: (val, important) => `
    background-color:${val} ${important};
    border-color:${val} ${important};
    color:${MapleColorHelper.getContrastColor(val)} ${important};
  `,
    'theme-outline': (val, important) => `
    background-color: ${MapleColorHelper.getContrastColor(val)} ${important};
    border-color:${val} ${important};
    color:${val} ${important};
  `,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZXh0ZW5zaW9uLW1hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcGxlLyIsInNvdXJjZXMiOlsicHJvcGVydHktZXh0ZW5zaW9uLW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRztJQUN0QyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FDN0IsZUFBZSxHQUFHLElBQUksU0FBUyxpQkFBaUIsR0FBRyxJQUFJLFNBQVMsR0FBRztJQUNyRSxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FDN0IsY0FBYyxHQUFHLElBQUksU0FBUyxrQkFBa0IsR0FBRyxJQUFJLFNBQVMsR0FBRztJQUNyRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FDOUIsZ0JBQWdCLEdBQUcsSUFBSSxTQUFTLGtCQUFrQixHQUFHLElBQUksU0FBUyxHQUFHO0lBQ3ZFLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUM5QixlQUFlLEdBQUcsSUFBSSxTQUFTLG1CQUFtQixHQUFHLElBQUksU0FBUyxHQUFHO0lBQ3ZFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO1lBQ2hCLEdBQUcsSUFBSSxTQUFTO0dBQ3pCO0lBQ0QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7dUJBQ04sR0FBRyxJQUFJLFNBQVM7bUJBQ3BCLEdBQUcsSUFBSSxTQUFTO1lBQ3ZCLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVM7R0FDNUQ7SUFDRCxlQUFlLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQzt3QkFDZixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTO21CQUN4RCxHQUFHLElBQUksU0FBUztZQUN2QixHQUFHLElBQUksU0FBUztHQUN6QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBsZUNvbG9ySGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2NvbG9yLmhlbHBlcic7XG5cbmV4cG9ydCBjb25zdCBNQVBMRV9QUk9QX0VYVEVOU0lPTl9NQVAgPSB7XG4gICdtYXJnaW4teCc6ICh2YWwsIGltcG9ydGFudCkgPT5cbiAgICBgbWFyZ2luLWxlZnQ6JHt2YWx9ICR7aW1wb3J0YW50fTttYXJnaW4tcmlnaHQ6JHt2YWx9ICR7aW1wb3J0YW50fTtgLFxuICAnbWFyZ2luLXknOiAodmFsLCBpbXBvcnRhbnQpID0+XG4gICAgYG1hcmdpbi10b3A6JHt2YWx9ICR7aW1wb3J0YW50fTttYXJnaW4tYm90dG9tOiR7dmFsfSAke2ltcG9ydGFudH07YCxcbiAgJ3BhZGRpbmcteCc6ICh2YWwsIGltcG9ydGFudCkgPT5cbiAgICBgcGFkZGluZy1sZWZ0OiR7dmFsfSAke2ltcG9ydGFudH07cGFkZGluZy1yaWdodDoke3ZhbH0gJHtpbXBvcnRhbnR9O2AsXG4gICdwYWRkaW5nLXknOiAodmFsLCBpbXBvcnRhbnQpID0+XG4gICAgYHBhZGRpbmctdG9wOiR7dmFsfSAke2ltcG9ydGFudH07cGFkZGluZy1ib3R0b206JHt2YWx9ICR7aW1wb3J0YW50fTtgLFxuICBsaW5rOiAodmFsLCBpbXBvcnRhbnQpID0+IGBcbiAgICBjb2xvcjoke3ZhbH0gJHtpbXBvcnRhbnR9O1xuICBgLFxuICB0aGVtZTogKHZhbCwgaW1wb3J0YW50KSA9PiBgXG4gICAgYmFja2dyb3VuZC1jb2xvcjoke3ZhbH0gJHtpbXBvcnRhbnR9O1xuICAgIGJvcmRlci1jb2xvcjoke3ZhbH0gJHtpbXBvcnRhbnR9O1xuICAgIGNvbG9yOiR7TWFwbGVDb2xvckhlbHBlci5nZXRDb250cmFzdENvbG9yKHZhbCl9ICR7aW1wb3J0YW50fTtcbiAgYCxcbiAgJ3RoZW1lLW91dGxpbmUnOiAodmFsLCBpbXBvcnRhbnQpID0+IGBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke01hcGxlQ29sb3JIZWxwZXIuZ2V0Q29udHJhc3RDb2xvcih2YWwpfSAke2ltcG9ydGFudH07XG4gICAgYm9yZGVyLWNvbG9yOiR7dmFsfSAke2ltcG9ydGFudH07XG4gICAgY29sb3I6JHt2YWx9ICR7aW1wb3J0YW50fTtcbiAgYCxcbn07XG4iXX0=