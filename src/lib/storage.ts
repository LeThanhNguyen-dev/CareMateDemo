import { User, Booking, CertificationRequest } from '../types';

const STORAGE_KEYS = {
    USERS: 'caremom_users',
    CURRENT_USER: 'caremom_current_user',
    BOOKINGS: 'caremom_bookings',
    CERT_REQUESTS: 'caremom_cert_requests',
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

// --- Certification Request Management ---

export const getCertRequests = (): CertificationRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CERT_REQUESTS);
    return data ? JSON.parse(data) : [];
};

export const saveCertRequest = (req: CertificationRequest): void => {
    const requests = getCertRequests();
    const existingIndex = requests.findIndex(r => r.id === req.id);
    if (existingIndex > -1) {
        requests[existingIndex] = req;
    } else {
        requests.push(req);
    }
    localStorage.setItem(STORAGE_KEYS.CERT_REQUESTS, JSON.stringify(requests));
};

export const getCertRequestByNurseId = (nurseId: string): CertificationRequest | null => {
    const requests = getCertRequests();
    return requests.find(r => r.nurseId === nurseId) || null;
};

export const updateCertRequestStatus = (
    requestId: string,
    status: 'approved' | 'rejected',
    adminNote?: string
): void => {
    const requests = getCertRequests();
    const idx = requests.findIndex(r => r.id === requestId);
    if (idx > -1) {
        requests[idx].status = status;
        requests[idx].reviewedAt = new Date().toISOString();
        if (adminNote) requests[idx].adminNote = adminNote;
        localStorage.setItem(STORAGE_KEYS.CERT_REQUESTS, JSON.stringify(requests));

        // If approved, update user's isVerified
        if (status === 'approved') {
            const users = getUsers();
            const userIdx = users.findIndex(u => u.id === requests[idx].nurseId);
            if (userIdx > -1) {
                users[userIdx].isVerified = true;
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

                // Also update current user if it's the same person
                const current = getCurrentUser();
                if (current && current.id === requests[idx].nurseId) {
                    current.isVerified = true;
                    setCurrentUser(current);
                }
            }
        }
    }
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

    // Seed demo cert requests
    const certReqs = getCertRequests();
    if (certReqs.length === 0) {
        const demoRequests: CertificationRequest[] = [
            {
                id: 'cert-1',
                nurseId: 'nurse-demo-1',
                nurseName: 'Maria Garcia',
                nurseEmail: 'maria@example.com',
                nurseImage: 'https://i.pravatar.cc/100?img=45',
                documents: [
                    { name: 'Giấy Phép Hành Nghề', type: 'license', uploadedAt: '2024-10-20' },
                    { name: 'Chứng Chỉ CPR', type: 'certificate', uploadedAt: '2024-10-20' },
                ],
                certifications: ['RN', 'CPR Certified'],
                experience: 5,
                specialization: 'Hậu Sản',
                status: 'pending',
                submittedAt: '2024-10-24',
            },
            {
                id: 'cert-2',
                nurseId: 'nurse-demo-2',
                nurseName: 'David Lee',
                nurseEmail: 'david@example.com',
                nurseImage: 'https://i.pravatar.cc/100?img=11',
                documents: [
                    { name: 'Giấy Phép Hành Nghề', type: 'license', uploadedAt: '2024-10-21' },
                    { name: 'CMND', type: 'id', uploadedAt: '2024-10-21' },
                ],
                certifications: ['LPN', 'NICU Certified'],
                experience: 8,
                specialization: 'Sơ Sinh',
                status: 'pending',
                submittedAt: '2024-10-23',
            },
            {
                id: 'cert-3',
                nurseId: 'nurse-demo-3',
                nurseName: 'Sophie Turner',
                nurseEmail: 'sophie@example.com',
                nurseImage: 'https://i.pravatar.cc/100?img=34',
                documents: [
                    { name: 'Giấy Phép Hành Nghề', type: 'license', uploadedAt: '2024-10-19' },
                    { name: 'IBCLC Certificate', type: 'certificate', uploadedAt: '2024-10-19' },
                ],
                certifications: ['RN', 'IBCLC'],
                experience: 10,
                specialization: 'Sữa Mẹ',
                status: 'pending',
                submittedAt: '2024-10-22',
            },
            {
                id: 'cert-4',
                nurseId: 'nurse-demo-4',
                nurseName: 'Laura Wilson',
                nurseEmail: 'laura@example.com',
                nurseImage: 'https://i.pravatar.cc/100?img=23',
                documents: [
                    { name: 'Giấy Phép Hành Nghề', type: 'license', uploadedAt: '2024-10-18' },
                ],
                certifications: ['RN', 'AHA Instructor'],
                experience: 8,
                specialization: 'Sức Khỏe & An Toàn',
                status: 'approved',
                submittedAt: '2024-10-18',
                reviewedAt: '2024-10-20',
            },
        ];
        demoRequests.forEach(r => saveCertRequest(r));
    }
};
