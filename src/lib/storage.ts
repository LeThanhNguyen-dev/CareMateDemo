import { User, Booking } from '../types';

const STORAGE_KEYS = {
    USERS: 'caremom_users',
    CURRENT_USER: 'caremom_current_user',
    BOOKINGS: 'caremom_bookings',
};

// --- User Management ---

export const getUsers = (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
    const users = getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id || u.email === user.email);

    if (existingIndex > -1) {
        users[existingIndex] = user;
    } else {
        users.push(user);
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
    if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
};

// --- Booking Management ---

export const getBookings = (): Booking[] => {
    const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return bookings ? JSON.parse(bookings) : [];
};

export const saveBooking = (booking: Booking): void => {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
};

// --- Demo Data initialization ---
export const initDemoData = () => {
    const users = getUsers();
    if (users.length === 0) {
        const adminUser: User = {
            id: 'admin-1',
            name: 'CareMom Admin',
            email: 'admin@caremom.com',
            role: 'admin',
        };
        saveUser(adminUser);
    }
};
