export interface User {
  id: string;
  name: string;
  email: string;
  role: 'mom' | 'nurse' | 'admin';
  title?: string;
  specialization?: string[];
  isVerified?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  unit: string;
  image: string;
}

export interface Nurse {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  image: string;
  verified: boolean;
  bio: string;
  certifications: string[];
  nextAvailable: string;
  services: string[];
}

export interface Booking {
  id: string;
  nurseId: string;
  nurseName: string;
  nurseImage: string;
  serviceTitle: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface CertificationRequest {
  id: string;
  nurseId: string;
  nurseName: string;
  nurseEmail: string;
  nurseImage?: string;
  documents: {
    name: string;
    type: string;
    uploadedAt: string;
  }[];
  certifications: string[];
  experience: number;
  specialization: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  adminNote?: string;
}

export const SERVICES: Service[] = [
  // === Postpartum ===
  {
    id: 'postpartum-basic',
    title: 'Chăm Sóc Hậu Sản – Cơ Bản',
    description: 'Hỗ trợ thiết yếu cho mẹ phục hồi sau sinh, bao gồm chăm sóc vết thương, theo dõi sinh hiệu và hỗ trợ tinh thần.',
    icon: 'favorite',
    price: 120,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-premium',
    title: 'Chăm Sóc Hậu Sản – Cao Cấp',
    description: 'Gói chăm sóc hậu sản toàn diện bao gồm chăm sóc cá nhân, lên kế hoạch dinh dưỡng, hướng dẫn tập thể dục và kiểm tra sức khỏe tinh thần.',
    icon: 'favorite',
    price: 220,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-confinement',
    title: 'Chăm Sóc Ở Cữ (30 Ngày)',
    description: 'Thực hành ở cữ hậu sản truyền thống và hiện đại tập trung vào phục hồi hoàn toàn và dinh dưỡng trong trọn một tháng.',
    icon: 'home_health',
    price: 3500,
    unit: 'gói',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-csection',
    title: 'Phục Hồi Sinh Mổ',
    description: 'Chăm sóc sau phẫu thuật chuyên biệt để phục hồi sinh mổ, bao gồm theo dõi vết thương và hỗ trợ vận động.',
    icon: 'healing',
    price: 180,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-mental',
    title: 'Sức Khoẻ Tinh Thần Hậu Sản',
    description: 'Hỗ trợ tinh thần và sàng lọc trầm cảm cùng lo âu sau sinh với các lộ trình định hướng.',
    icon: 'psychology',
    price: 140,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop'
  },
  // === Newborn ===
  {
    id: 'newborn-basic',
    title: 'Chăm Sóc Sơ Sinh – Cơ Bản',
    description: 'Chăm sóc chuyên nghiệp cho trẻ sơ sinh của bạn bao gồm cho ăn, tắm rửa, thay tã và theo dõi sự phát triển.',
    icon: 'child_care',
    price: 80,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1523294587484-5b7421c9707b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-premium',
    title: 'Chăm Sóc Sơ Sinh – Cao Cấp',
    description: 'Chăm sóc sơ sinh mở rộng với rèn luyện giấc ngủ, hướng dẫn kỹ năng lật lẫy bụng, theo dõi cột mốc và giáo dục phụ huynh.',
    icon: 'child_care',
    price: 150,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-twins',
    title: 'Chăm Sóc Sinh Đôi & Đa Thai',
    description: 'Hỗ trợ chuyên dụng cho các gia đình có trẻ sinh đôi hoặc đa thai, quản lý lịch cho ăn và chăm sóc phối hợp.',
    icon: 'group',
    price: 200,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-massage',
    title: 'Massage Trị Liệu Cho Bé',
    description: 'Kỹ thuật massage nhẹ nhàng để thúc đẩy sự gắn kết, cải thiện giấc ngủ và làm dịu cơn đau bụng ở trẻ sơ sinh.',
    icon: 'spa',
    price: 70,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-bath',
    title: 'Tắm & Vệ Sinh Cho Bé',
    description: 'Hướng dẫn tắm an toàn và chăm sóc vệ sinh bao gồm cắt móng tay, chăm sóc rốn và sức khỏe làn da.',
    icon: 'bathtub',
    price: 50,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1523294587484-5b7421c9707b?q=80&w=800&auto=format&fit=crop'
  },
  // === Lactation ===
  {
    id: 'lactation-consult',
    title: 'Tư Vấn Cho Con Bú',
    description: 'Hướng dẫn và hỗ trợ cá nhân hóa để các bà mẹ cho con bú vượt qua khó khăn và thiết lập thói quen thường nhật.',
    icon: 'water_drop',
    price: 120,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lactation-home',
    title: 'Hỗ Trợ Cho Con Bú Tại Nhà',
    description: 'Hỗ trợ cho con bú tại nhà với đánh giá cách ngậm vú, hướng dẫn tư thế và xây dựng kế hoạch cho ăn.',
    icon: 'water_drop',
    price: 150,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lactation-pumping',
    title: 'Hút Sữa & Bảo Quản Sữa',
    description: 'Hướng dẫn của chuyên gia về cách sử dụng máy hút sữa, kỹ thuật vắt sữa, bảo quản an toàn và kế hoạch trở lại làm việc.',
    icon: 'water_drop',
    price: 90,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lactation-weaning',
    title: 'Hỗ Trợ Cai Sữa',
    description: 'Các chiến lược cai sữa dần dần và giới thiệu thực phẩm đặc cùng với hướng dẫn về dinh dưỡng.',
    icon: 'restaurant',
    price: 80,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop'
  },
  // === Night Care ===
  {
    id: 'night-nanny-basic',
    title: 'Bảo Mẫu Ban Đêm – Cơ Bản',
    description: 'Chăm sóc trẻ sơ sinh qua đêm từ 10 Giờ tối đến 6 Giờ sáng, cho phép cha mẹ có được sự nghỉ ngơi cần thiết.',
    icon: 'bedtime',
    price: 200,
    unit: 'đêm',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'night-nanny-premium',
    title: 'Bảo Mẫu Ban Đêm – Cao Cấp',
    description: 'Chăm sóc qua đêm kéo dài với việc triển khai rèn luyện giấc ngủ, nhật ký cho ăn và báo cáo tóm tắt buổi sáng.',
    icon: 'bedtime',
    price: 300,
    unit: 'đêm',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'night-nanny-weekend',
    title: 'Gói Ban Đêm Cuối Tuần',
    description: 'Trực đêm Thứ Sáu và Thứ Bảy cho những bậc cha mẹ muốn có một ngày cuối tuần yên tĩnh. Bao gồm nhật ký chăm sóc chi tiết.',
    icon: 'bedtime',
    price: 350,
    unit: 'cuối tuần',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  // === Prenatal ===
  {
    id: 'prenatal-basic',
    title: 'Hỗ Trợ Tiền Sản',
    description: 'Các lớp học chuẩn bị và hỗ trợ cho phụ nữ mang thai tập trung vào chuyển dạ, sinh nở và những ngày đầu làm mẹ.',
    icon: 'pregnant_woman',
    price: 90,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prenatal-yoga',
    title: 'Yoga Tiền Sản & Thể Dục',
    description: 'Thói quen tập thể dục an toàn và các bài tập yoga được thiết kế cho từng tam cá nguyệt của thai kỳ.',
    icon: 'fitness_center',
    price: 70,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prenatal-nutrition',
    title: 'Kế Hoạch Dinh Dưỡng Tiền Sản',
    description: 'Các bữa ăn được tùy chỉnh và tư vấn chế độ ăn uống để hỗ trợ thai kỳ khỏe mạnh và sự phát triển của thai nhi.',
    icon: 'restaurant',
    price: 100,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'birth-doula',
    title: 'Dịch Vụ Doula Sinh Nở',
    description: 'Hỗ trợ liên tục về tinh thần và thể chất trong quá trình chuyển dạ và sinh nở để có trải nghiệm sinh nở êm ái.',
    icon: 'favorite',
    price: 500,
    unit: 'lần sinh',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop'
  },
  // === NICU & Special Needs ===
  {
    id: 'nicu-transition',
    title: 'Chuyển Tiếp NICU-Về-Nhà',
    description: 'Hỗ trợ chuyên biệt cho các gia đình đưa em bé sinh non hoặc tốt nghiệp NICU về nhà lần đầu tiên.',
    icon: 'local_hospital',
    price: 250,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'preemie-care',
    title: 'Chăm Sóc Đặc Biệt Trẻ Sinh Non',
    description: 'Theo dõi chuyên gia và hỗ trợ phát triển cho trẻ sinh non với các mốc tuổi được điều chỉnh.',
    icon: 'monitor_heart',
    price: 220,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1523294587484-5b7421c9707b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'special-needs',
    title: 'Chăm Sóc Trẻ Sơ Sinh Nhu Cầu Đặc Biệt',
    description: 'Kế hoạch chăm sóc phù hợp cho trẻ sơ sinh có nhu cầu y tế bao gồm ống truyền dịch, quản lý thuốc, và nhiều hơn nữa.',
    icon: 'medical_services',
    price: 280,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop'
  },
  // === Sleep ===
  {
    id: 'sleep-training',
    title: 'Rèn Luyện Giấc Ngủ Cho Bé',
    description: 'Các kỹ thuật rèn luyện giấc ngủ dựa trên bằng chứng để thiết lập thói quen ngủ lành mạnh từ những tháng đầu đời.',
    icon: 'bedtime',
    price: 130,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sleep-consult',
    title: 'Gói Tư Vấn Giấc Ngủ',
    description: 'Chương trình rèn giấc ngủ toàn diện trong 2 tuần với đánh giá ban đầu, kế hoạch tùy chỉnh và các lần kiểm tra đánh giá theo dõi.',
    icon: 'bedtime',
    price: 400,
    unit: 'gói',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  // === Wellness & Other ===
  {
    id: 'mom-wellness',
    title: 'Kiểm Tra Sức Khỏe Cho Mẹ',
    description: 'Khám theo dõi sức khỏe thường xuyên bao gồm huyết áp, cân nặng, đánh giá tâm trạng và tiến độ hồi phục.',
    icon: 'health_and_safety',
    price: 60,
    unit: 'lần khám',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sibling-prep',
    title: 'Lớp Sẵn Sàng Cho Anh/Chị Lớn',
    description: 'Giúp trẻ lớn hơn thích nghi với việc có thêm em bé bằng giáo dục và hướng dẫn phù hợp với lứa tuổi.',
    icon: 'family_restroom',
    price: 60,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cpr-training',
    title: 'Hô Hấp Nhân Tạo & Sơ Cứu Trẻ',
    description: 'Đào tạo an toàn thiết yếu cho phụ huynh và người chăm sóc bao gồm hô hấp nhân tạo cho trẻ, quy trình xử lý nghẹt thở và trường hợp khẩn cấp.',
    icon: 'emergency',
    price: 75,
    unit: 'lớp',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'nutrition-postpartum',
    title: 'Dinh Dưỡng Hậu Sản & Nấu Ăn',
    description: 'Lên kế hoạch và chuẩn bị bữa ăn giàu chất dinh dưỡng để hỗ trợ quá trình phục hồi, tăng mức năng lượng và duy trì cho con bú.',
    icon: 'restaurant',
    price: 110,
    unit: 'buổi',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
];

export const NURSES: Nurse[] = [
  {
    id: '1',
    name: 'Sarah Jenkins, RN',
    title: 'Postpartum & Lactation Specialist',
    specialization: 'Postpartum & Lactation',
    experience: 10,
    rating: 4.9,
    reviewsCount: 124,
    hourlyRate: 45,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Compassionate registered nurse with extensive experience in postpartum care and lactation consulting.',
    certifications: ['RN', 'IBCLC', 'CPR Certified'],
    nextAvailable: 'Today, 2:00 PM',
    services: ['postpartum-basic', 'postpartum-premium', 'lactation-consult', 'lactation-home', 'mom-wellness'],
    location: 'An Giang'
  },
  {
    id: '2',
    name: 'Maria Santos, RN',
    title: 'C-Section Recovery Expert',
    specialization: 'Postpartum & Lactation',
    experience: 8,
    rating: 4.8,
    reviewsCount: 98,
    hourlyRate: 48,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Specialized in cesarean recovery with gentle, evidence-based approaches to healing.',
    certifications: ['RN', 'BSN', 'Wound Care Certified'],
    nextAvailable: 'Today, 4:00 PM',
    services: ['postpartum-basic', 'postpartum-csection', 'postpartum-premium', 'mom-wellness'],
    location: 'Bà Rịa - Vũng Tàu'
  },
  {
    id: '3',
    name: 'Angela Thompson, CNM',
    title: 'Postpartum Mental Health Nurse',
    specialization: 'Postpartum & Lactation',
    experience: 12,
    rating: 4.9,
    reviewsCount: 156,
    hourlyRate: 55,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Certified nurse-midwife focused on postpartum mental wellness and emotional recovery.',
    certifications: ['CNM', 'PMH-C', 'CPR Certified'],
    nextAvailable: 'Tomorrow, 9:00 AM',
    services: ['postpartum-mental', 'postpartum-basic', 'postpartum-confinement', 'mom-wellness'],
    location: 'Bắc Giang'
  },
  {
    id: '4',
    name: 'Emily Chen, LPN',
    title: 'Pediatric Nurse & Sleep Trainer',
    specialization: 'Newborn & Sleep',
    experience: 6,
    rating: 4.8,
    reviewsCount: 89,
    hourlyRate: 40,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Specializing in infant sleep training and establishing healthy routines for newborns.',
    certifications: ['LPN', 'Sleep Specialist', 'First Aid'],
    nextAvailable: 'Tomorrow, 8:00 AM',
    services: ['newborn-basic', 'newborn-premium', 'sleep-training', 'sleep-consult', 'newborn-bath'],
    location: 'Bắc Kạn'
  },
  {
    id: '5',
    name: 'Jessica Park, RN',
    title: 'Newborn Massage & Wellness',
    specialization: 'Newborn & Sleep',
    experience: 5,
    rating: 4.7,
    reviewsCount: 67,
    hourlyRate: 38,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Infant massage therapist with certifications in developmental care and baby wellness.',
    certifications: ['RN', 'CIMI', 'First Aid'],
    nextAvailable: 'Today, 3:00 PM',
    services: ['newborn-massage', 'newborn-basic', 'newborn-bath', 'newborn-premium'],
    location: 'Bạc Liêu'
  },
  {
    id: '6',
    name: 'David Kim, RN',
    title: 'Twins & Multiples Specialist',
    specialization: 'Newborn & Sleep',
    experience: 9,
    rating: 4.9,
    reviewsCount: 112,
    hourlyRate: 52,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Expert in managing twins and multiples care with synchronized feeding and sleep schedules.',
    certifications: ['RN', 'BSN', 'NRP Certified'],
    nextAvailable: 'Nov 15, 10:00 AM',
    services: ['newborn-twins', 'newborn-basic', 'newborn-premium', 'night-nanny-basic'],
    location: 'Bắc Ninh'
  },
  {
    id: '7',
    name: 'Rachel Green, LPN',
    title: 'Newborn Care Specialist',
    specialization: 'Newborn & Sleep',
    experience: 4,
    rating: 4.6,
    reviewsCount: 45,
    hourlyRate: 35,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Dedicated newborn care provider focused on creating calm, nurturing environments for infants.',
    certifications: ['LPN', 'CPR Certified', 'First Aid'],
    nextAvailable: 'Today, 1:00 PM',
    services: ['newborn-basic', 'newborn-bath', 'newborn-massage', 'sibling-prep'],
    location: 'Bến Tre'
  },
  {
    id: '8',
    name: 'Dr. Lisa Chang, IBCLC',
    title: 'Board Certified Lactation Consultant',
    specialization: 'Lactation',
    experience: 14,
    rating: 5.0,
    reviewsCount: 230,
    hourlyRate: 60,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'One of the top-rated lactation consultants with over a decade of helping mothers overcome breastfeeding challenges.',
    certifications: ['IBCLC', 'RN', 'BSN', 'CLC'],
    nextAvailable: 'Tomorrow, 11:00 AM',
    services: ['lactation-consult', 'lactation-home', 'lactation-pumping', 'lactation-weaning'],
    location: 'Bình Định'
  },
  {
    id: '9',
    name: 'Olivia Foster, CLC',
    title: 'Lactation & Weaning Counselor',
    specialization: 'Lactation',
    experience: 7,
    rating: 4.8,
    reviewsCount: 103,
    hourlyRate: 42,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Certified lactation counselor specializing in weaning transitions and introducing solid foods.',
    certifications: ['CLC', 'CPR Certified', 'Nutrition Cert'],
    nextAvailable: 'Today, 5:00 PM',
    services: ['lactation-consult', 'lactation-weaning', 'lactation-pumping', 'nutrition-postpartum'],
    location: 'Bình Dương'
  },
  {
    id: '10',
    name: 'Patricia Moore, RN',
    title: 'Night Nanny & Sleep Specialist',
    specialization: 'Night Care',
    experience: 11,
    rating: 4.9,
    reviewsCount: 178,
    hourlyRate: 50,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Experienced overnight care provider who helps families establish peaceful nighttime routines.',
    certifications: ['RN', 'Sleep Specialist', 'NRP'],
    nextAvailable: 'Tonight, 10:00 PM',
    services: ['night-nanny-basic', 'night-nanny-premium', 'night-nanny-weekend', 'sleep-training'],
    location: 'Bình Phước'
  },
  {
    id: '11',
    name: 'Sophia Williams, LPN',
    title: 'Weekend Night Nanny',
    specialization: 'Night Care',
    experience: 5,
    rating: 4.7,
    reviewsCount: 62,
    hourlyRate: 42,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Weekend night specialist giving parents well-deserved breaks with thorough care logs.',
    certifications: ['LPN', 'CPR Certified', 'First Aid'],
    nextAvailable: 'Friday, 9:00 PM',
    services: ['night-nanny-basic', 'night-nanny-weekend', 'newborn-basic'],
    location: 'Bình Thuận'
  },
  {
    id: '12',
    name: 'Amanda Rivera, CNM',
    title: 'Prenatal & Birth Doula',
    specialization: 'Prenatal & Birth',
    experience: 13,
    rating: 4.9,
    reviewsCount: 195,
    hourlyRate: 58,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Certified nurse-midwife and birth doula providing holistic prenatal and birthing support.',
    certifications: ['CNM', 'CD(DONA)', 'CPR Certified'],
    nextAvailable: 'Nov 14, 10:00 AM',
    services: ['prenatal-basic', 'birth-doula', 'prenatal-yoga', 'prenatal-nutrition'],
    location: 'Cà Mau'
  },
  {
    id: '13',
    name: 'Hannah Lee, RN',
    title: 'Prenatal Wellness Coach',
    specialization: 'Prenatal & Birth',
    experience: 6,
    rating: 4.7,
    reviewsCount: 74,
    hourlyRate: 40,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Focused on prenatal fitness, nutrition, and preparing mothers for a confident birth experience.',
    certifications: ['RN', 'Prenatal Fitness Cert', 'Nutrition Cert'],
    nextAvailable: 'Tomorrow, 2:00 PM',
    services: ['prenatal-basic', 'prenatal-yoga', 'prenatal-nutrition', 'cpr-training'],
    location: 'Cần Thơ'
  },
  {
    id: '14',
    name: 'Marcus Johnson, RN',
    title: 'NICU Specialist & Preemie Care',
    specialization: 'NICU & Preemie',
    experience: 15,
    rating: 4.9,
    reviewsCount: 210,
    hourlyRate: 55,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Former NICU nurse offering specialized care for premature infants and babies with specific medical needs.',
    certifications: ['RN', 'BSN', 'NICU Certified', 'BLS'],
    nextAvailable: 'Nov 12, 9:00 AM',
    services: ['nicu-transition', 'preemie-care', 'special-needs', 'newborn-basic'],
    location: 'Cao Bằng'
  },
  {
    id: '15',
    name: 'Dr. Aisha Khan, NNP',
    title: 'Neonatal Nurse Practitioner',
    specialization: 'NICU & Preemie',
    experience: 18,
    rating: 5.0,
    reviewsCount: 267,
    hourlyRate: 70,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Board-certified neonatal nurse practitioner with NICU leadership experience.',
    certifications: ['NNP-BC', 'RN', 'MSN', 'NRP'],
    nextAvailable: 'Nov 13, 11:00 AM',
    services: ['nicu-transition', 'preemie-care', 'special-needs'],
    location: 'Đà Nẵng'
  },
  {
    id: '16',
    name: 'Natalie Brooks, CSC',
    title: 'Certified Sleep Consultant',
    specialization: 'Sleep Training',
    experience: 7,
    rating: 4.8,
    reviewsCount: 142,
    hourlyRate: 45,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Gentle sleep training expert helping families achieve restful nights with science-backed methods.',
    certifications: ['CSC', 'CPR Certified', 'Child Dev. Cert'],
    nextAvailable: 'Today, 6:00 PM',
    services: ['sleep-training', 'sleep-consult', 'night-nanny-basic', 'newborn-premium'],
    location: 'Đắk Lắk'
  },
  {
    id: '17',
    name: 'Grace Miller, RD',
    title: 'Maternal Nutrition Specialist',
    specialization: 'Wellness & Nutrition',
    experience: 8,
    rating: 4.7,
    reviewsCount: 88,
    hourlyRate: 42,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Registered dietitian specializing in prenatal and postpartum nutrition for optimal recovery.',
    certifications: ['RD', 'CLC', 'Nutrition Cert'],
    nextAvailable: 'Tomorrow, 10:00 AM',
    services: ['nutrition-postpartum', 'prenatal-nutrition', 'lactation-weaning', 'mom-wellness'],
    location: 'Đắk Nông'
  },
  {
    id: '18',
    name: 'Karen Taylor, RN',
    title: 'Wellness & Safety Instructor',
    specialization: 'Wellness & Nutrition',
    experience: 10,
    rating: 4.8,
    reviewsCount: 115,
    hourlyRate: 38,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Certified infant CPR instructor and family safety educator with a warm teaching style.',
    certifications: ['RN', 'AHA Instructor', 'First Aid Instructor'],
    nextAvailable: 'Today, 10:00 AM',
    services: ['cpr-training', 'mom-wellness', 'sibling-prep', 'newborn-basic'],
    location: 'Điện Biên'
  },
  {
    id: '19',
    name: 'Mei Lin Wong, RN',
    title: 'Confinement Care Specialist',
    specialization: 'Postpartum & Lactation',
    experience: 16,
    rating: 4.9,
    reviewsCount: 198,
    hourlyRate: 48,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Expert in traditional and modern confinement practices with a warm and nurturing approach.',
    certifications: ['RN', 'Confinement Care Cert', 'TCM Basic'],
    nextAvailable: 'Nov 16, 8:00 AM',
    services: ['postpartum-confinement', 'postpartum-basic', 'nutrition-postpartum', 'postpartum-premium'],
    location: 'Đồng Nai'
  },
  {
    id: '20',
    name: 'Diana Reyes, RN',
    title: 'Full-Spectrum Postpartum Nurse',
    specialization: 'Postpartum & Lactation',
    experience: 9,
    rating: 4.8,
    reviewsCount: 134,
    hourlyRate: 46,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Versatile postpartum nurse covering recovery care, lactation support, and newborn basics.',
    certifications: ['RN', 'CLC', 'CPR Certified'],
    nextAvailable: 'Today, 11:00 AM',
    services: ['postpartum-basic', 'postpartum-premium', 'lactation-consult', 'newborn-basic', 'mom-wellness'],
    location: 'Đồng Tháp'
  },
  {
    id: '21',
    name: 'Chloe Evans, LPN',
    title: 'Newborn Care & Bathing Specialist',
    specialization: 'Newborn & Sleep',
    experience: 5,
    rating: 4.7,
    reviewsCount: 82,
    hourlyRate: 38,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'A gentle and caring nurse focused on newborn hygiene, bathing, and establishing early routines.',
    certifications: ['LPN', 'First Aid', 'CPR Certified'],
    nextAvailable: 'Tomorrow, 9:00 AM',
    services: ['newborn-basic', 'newborn-bath', 'newborn-massage'],
    location: 'Gia Lai'
  },
  {
    id: '22',
    name: 'Jasmine Patel, RN',
    title: 'Lactation & Weaning Specialist',
    specialization: 'Lactation',
    experience: 8,
    rating: 4.9,
    reviewsCount: 110,
    hourlyRate: 45,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Passionate about helping mothers navigate the complex journey of breastfeeding and weaning comfortably.',
    certifications: ['RN', 'CLC', 'Nutrition Cert'],
    nextAvailable: 'Today, 1:00 PM',
    services: ['lactation-consult', 'lactation-weaning', 'nutrition-postpartum'],
    location: 'Hà Giang'
  },
  {
    id: '23',
    name: 'Michelle Torres, CNM',
    title: 'Prenatal & Birth Doula',
    specialization: 'Prenatal & Birth',
    experience: 11,
    rating: 4.8,
    reviewsCount: 145,
    hourlyRate: 55,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Empowering mothers through education, yoga, and continuous support during labor and delivery.',
    certifications: ['CNM', 'CD(DONA)', 'Yoga Instructor'],
    nextAvailable: 'Nov 20, 10:00 AM',
    services: ['prenatal-basic', 'birth-doula', 'prenatal-yoga'],
    location: 'Hà Nam'
  },
  {
    id: '24',
    name: 'Valerie King, RN',
    title: 'Night Nanny Premium Care',
    specialization: 'Night Care',
    experience: 7,
    rating: 4.9,
    reviewsCount: 95,
    hourlyRate: 48,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Dedicated overnight nurse providing comprehensive care, sleep training, and morning logs for tired parents.',
    certifications: ['RN', 'Sleep Specialist', 'CPR Certified'],
    nextAvailable: 'Tonight, 9:00 PM',
    services: ['night-nanny-premium', 'night-nanny-weekend', 'sleep-training'],
    location: 'Hà Nội'
  },
  {
    id: '25',
    name: 'Dr. John Miller, NNP',
    title: 'Special Needs & NICU Expert',
    specialization: 'NICU & Preemie',
    experience: 20,
    rating: 5.0,
    reviewsCount: 310,
    hourlyRate: 75,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Highly experienced neonatal practitioner specializing in complex medical needs and NICU transitions.',
    certifications: ['NNP-BC', 'RN', 'NRP Instructor'],
    nextAvailable: 'Nov 18, 8:00 AM',
    services: ['special-needs', 'nicu-transition', 'preemie-care'],
    location: 'Hà Tĩnh'
  },
  {
    id: '26',
    name: 'Samantha Lewis, LPN',
    title: 'Postpartum C-Section Nurse',
    specialization: 'Postpartum & Lactation',
    experience: 6,
    rating: 4.7,
    reviewsCount: 78,
    hourlyRate: 40,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Specialized focus on post-operative care, mobility assistance, and overall recovery for C-section mothers.',
    certifications: ['LPN', 'Wound Care Basics', 'First Aid'],
    nextAvailable: 'Today, 3:00 PM',
    services: ['postpartum-csection', 'postpartum-basic', 'mom-wellness'],
    location: 'Hải Dương'
  },
  {
    id: '27',
    name: 'Olivia Martinez, RD',
    title: 'Pregnancy & Postpartum Dietitian',
    specialization: 'Wellness & Nutrition',
    experience: 9,
    rating: 4.9,
    reviewsCount: 160,
    hourlyRate: 50,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Helping mothers nourish their bodies during pregnancy and optimize recovery nutrition postpartum.',
    certifications: ['RD', 'Prenatal Nutrition Cert'],
    nextAvailable: 'Tomorrow, 11:00 AM',
    services: ['prenatal-nutrition', 'nutrition-postpartum', 'lactation-weaning'],
    location: 'Hải Phòng'
  },
  {
    id: '28',
    name: 'Isabella Scott, RN',
    title: 'Twins & Multiples Sleep Consultant',
    specialization: 'Newborn & Sleep',
    experience: 12,
    rating: 4.8,
    reviewsCount: 122,
    hourlyRate: 55,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'A lifeline for parents of multiples, expertly syncing sleep schedules and feeding routines.',
    certifications: ['RN', 'Sleep Specialist', 'BSN'],
    nextAvailable: 'Nov 12, 2:00 PM',
    services: ['newborn-twins', 'sleep-consult', 'sleep-training'],
    location: 'Hậu Giang'
  },
  {
    id: '29',
    name: 'Alexis Bennett, CNM',
    title: 'Postpartum Confinement Doula',
    specialization: 'Postpartum & Lactation',
    experience: 14,
    rating: 4.9,
    reviewsCount: 180,
    hourlyRate: 60,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Blending modern medical knowledge with traditional 30-day confinement recovery practices for holistic healing.',
    certifications: ['CNM', 'Holistic Health Cert', 'CPR Certified'],
    nextAvailable: 'Dec 01, 9:00 AM',
    services: ['postpartum-confinement', 'postpartum-premium', 'mom-wellness', 'lactation-consult'],
    location: 'Hòa Bình'
  },
  {
    id: '30',
    name: 'Laura Wilson, RN',
    title: 'Safety & Sibling Transition Coach',
    specialization: 'Wellness & Nutrition',
    experience: 8,
    rating: 4.8,
    reviewsCount: 95,
    hourlyRate: 42,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    verified: true,
    bio: 'Supporting growing families with CPR training and helping older children adjust to their new sibling.',
    certifications: ['RN', 'AHA Instructor', 'Pediatric Cert'],
    nextAvailable: 'Today, 5:00 PM',
    services: ['cpr-training', 'sibling-prep', 'mom-wellness'],
    location: 'Hưng Yên'
  }
];
