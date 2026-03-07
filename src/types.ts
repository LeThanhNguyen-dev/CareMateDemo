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

export const SERVICES: Service[] = [
  // === Postpartum ===
  {
    id: 'postpartum-basic',
    title: 'Postpartum Care – Basic',
    description: 'Essential support for mothers recovering from childbirth, including wound care, vital sign monitoring, and emotional support.',
    icon: 'favorite',
    price: 120,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-premium',
    title: 'Postpartum Care – Premium',
    description: 'Comprehensive postpartum package including personal care, nutrition planning, exercise guidance, and mental wellness check-ins.',
    icon: 'favorite',
    price: 220,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-confinement',
    title: 'Confinement Care (30 Days)',
    description: 'Traditional and modern postpartum confinement practices focused on full recovery and nutrition for a full month.',
    icon: 'home_health',
    price: 3500,
    unit: 'package',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-csection',
    title: 'C-Section Recovery',
    description: 'Specialized post-operative care for cesarean recovery, including wound monitoring and mobility assistance.',
    icon: 'healing',
    price: 180,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'postpartum-mental',
    title: 'Postpartum Mental Health',
    description: 'Emotional support and screening for postpartum depression and anxiety with referral pathways.',
    icon: 'psychology',
    price: 140,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop'
  },
  // === Newborn ===
  {
    id: 'newborn-basic',
    title: 'Newborn Care – Basic',
    description: 'Professional care for your newborn including feeding, bathing, diaper changes, and development monitoring.',
    icon: 'child_care',
    price: 80,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1523294587484-5b7421c9707b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-premium',
    title: 'Newborn Care – Premium',
    description: 'Extended newborn care with sleep training, tummy time coaching, milestone tracking, and parent education.',
    icon: 'child_care',
    price: 150,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-twins',
    title: 'Twins & Multiples Care',
    description: 'Dedicated support for families with twins or multiples, managing feeding schedules and coordinated care.',
    icon: 'group',
    price: 200,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-massage',
    title: 'Infant Massage Therapy',
    description: 'Gentle massage techniques to promote bonding, improve sleep, and ease colic in newborns.',
    icon: 'spa',
    price: 70,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'newborn-bath',
    title: 'Baby Bath & Grooming',
    description: 'Safe bathing instructions and grooming care including nail trimming, cord care, and skin health.',
    icon: 'bathtub',
    price: 50,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1523294587484-5b7421c9707b?q=80&w=800&auto=format&fit=crop'
  },
  // === Lactation ===
  {
    id: 'lactation-consult',
    title: 'Lactation Consulting',
    description: 'Personalized guidance and support for breastfeeding mothers to overcome challenges and establish a routine.',
    icon: 'water_drop',
    price: 120,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lactation-home',
    title: 'Home Lactation Support',
    description: 'In-home breastfeeding support with latch assessment, positioning guidance, and feeding plan development.',
    icon: 'water_drop',
    price: 150,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lactation-pumping',
    title: 'Pumping & Milk Storage',
    description: 'Expert guidance on breast pump usage, milk expression techniques, safe storage, and return-to-work planning.',
    icon: 'water_drop',
    price: 90,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lactation-weaning',
    title: 'Weaning Support',
    description: 'Gradual weaning strategies and introduction to solid foods with nutritional guidance.',
    icon: 'restaurant',
    price: 80,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop'
  },
  // === Night Care ===
  {
    id: 'night-nanny-basic',
    title: 'Night Nanny – Standard',
    description: 'Overnight newborn care from 10 PM to 6 AM, allowing parents to get much-needed rest.',
    icon: 'bedtime',
    price: 200,
    unit: 'night',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'night-nanny-premium',
    title: 'Night Nanny – Premium',
    description: 'Extended overnight care with sleep training implementation, feeding log, and morning summary report.',
    icon: 'bedtime',
    price: 300,
    unit: 'night',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'night-nanny-weekend',
    title: 'Weekend Night Package',
    description: 'Friday and Saturday night coverage for parents who want a restful weekend. Includes detailed care logs.',
    icon: 'bedtime',
    price: 350,
    unit: 'weekend',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  // === Prenatal ===
  {
    id: 'prenatal-basic',
    title: 'Prenatal Support',
    description: 'Preparation classes and support for expectant mothers focusing on labor, delivery, and early motherhood.',
    icon: 'pregnant_woman',
    price: 90,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prenatal-yoga',
    title: 'Prenatal Yoga & Fitness',
    description: 'Safe exercise routines and yoga practices designed for each trimester of pregnancy.',
    icon: 'fitness_center',
    price: 70,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prenatal-nutrition',
    title: 'Prenatal Nutrition Plan',
    description: 'Customized meal plans and dietary advice to support a healthy pregnancy and fetal development.',
    icon: 'restaurant',
    price: 100,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1584515733428-230a442d38b6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'birth-doula',
    title: 'Birth Doula Services',
    description: 'Continuous emotional and physical support during labor and delivery for a calm birthing experience.',
    icon: 'favorite',
    price: 500,
    unit: 'birth',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop'
  },
  // === NICU & Special Needs ===
  {
    id: 'nicu-transition',
    title: 'NICU-to-Home Transition',
    description: 'Specialized support for families bringing premature or NICU-graduated babies home for the first time.',
    icon: 'local_hospital',
    price: 250,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'preemie-care',
    title: 'Preemie Specialized Care',
    description: 'Expert monitoring and developmental support for premature infants with adjusted age milestones.',
    icon: 'monitor_heart',
    price: 220,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1523294587484-5b7421c9707b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'special-needs',
    title: 'Special Needs Newborn Care',
    description: 'Tailored care plans for newborns with medical needs including feeding tubes, medication management, and more.',
    icon: 'medical_services',
    price: 280,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop'
  },
  // === Sleep ===
  {
    id: 'sleep-training',
    title: 'Infant Sleep Training',
    description: 'Evidence-based sleep training techniques to establish healthy sleep habits from the early months.',
    icon: 'bedtime',
    price: 130,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sleep-consult',
    title: 'Sleep Consultation Package',
    description: 'Comprehensive 2-week sleep program with initial assessment, custom plan, and follow-up check-ins.',
    icon: 'bedtime',
    price: 400,
    unit: 'package',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop'
  },
  // === Wellness & Other ===
  {
    id: 'mom-wellness',
    title: 'Mom Wellness Check-In',
    description: 'Regular health monitoring visit including blood pressure, weight, mood assessment, and recovery progress.',
    icon: 'health_and_safety',
    price: 60,
    unit: 'visit',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sibling-prep',
    title: 'Sibling Preparation Class',
    description: 'Helping older children adjust to a new sibling with age-appropriate education and guidance.',
    icon: 'family_restroom',
    price: 60,
    unit: 'session',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cpr-training',
    title: 'Infant CPR & First Aid',
    description: 'Essential safety training for parents and caregivers covering infant CPR, choking response, and emergencies.',
    icon: 'emergency',
    price: 75,
    unit: 'class',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'nutrition-postpartum',
    title: 'Postpartum Nutrition & Meal Prep',
    description: 'Nutrient-rich meal planning and preparation to support recovery, energy levels, and breastfeeding.',
    icon: 'restaurant',
    price: 110,
    unit: 'session',
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
    services: ['postpartum-basic', 'postpartum-premium', 'lactation-consult', 'lactation-home', 'mom-wellness']
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
    services: ['postpartum-basic', 'postpartum-csection', 'postpartum-premium', 'mom-wellness']
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
    services: ['postpartum-mental', 'postpartum-basic', 'postpartum-confinement', 'mom-wellness']
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
    services: ['newborn-basic', 'newborn-premium', 'sleep-training', 'sleep-consult', 'newborn-bath']
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
    services: ['newborn-massage', 'newborn-basic', 'newborn-bath', 'newborn-premium']
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
    services: ['newborn-twins', 'newborn-basic', 'newborn-premium', 'night-nanny-basic']
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
    services: ['newborn-basic', 'newborn-bath', 'newborn-massage', 'sibling-prep']
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
    services: ['lactation-consult', 'lactation-home', 'lactation-pumping', 'lactation-weaning']
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
    services: ['lactation-consult', 'lactation-weaning', 'lactation-pumping', 'nutrition-postpartum']
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
    services: ['night-nanny-basic', 'night-nanny-premium', 'night-nanny-weekend', 'sleep-training']
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
    services: ['night-nanny-basic', 'night-nanny-weekend', 'newborn-basic']
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
    services: ['prenatal-basic', 'birth-doula', 'prenatal-yoga', 'prenatal-nutrition']
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
    services: ['prenatal-basic', 'prenatal-yoga', 'prenatal-nutrition', 'cpr-training']
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
    services: ['nicu-transition', 'preemie-care', 'special-needs', 'newborn-basic']
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
    services: ['nicu-transition', 'preemie-care', 'special-needs']
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
    services: ['sleep-training', 'sleep-consult', 'night-nanny-basic', 'newborn-premium']
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
    services: ['nutrition-postpartum', 'prenatal-nutrition', 'lactation-weaning', 'mom-wellness']
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
    services: ['cpr-training', 'mom-wellness', 'sibling-prep', 'newborn-basic']
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
    services: ['postpartum-confinement', 'postpartum-basic', 'nutrition-postpartum', 'postpartum-premium']
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
    services: ['postpartum-basic', 'postpartum-premium', 'lactation-consult', 'newborn-basic', 'mom-wellness']
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
    services: ['newborn-basic', 'newborn-bath', 'newborn-massage']
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
    services: ['lactation-consult', 'lactation-weaning', 'nutrition-postpartum']
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
    services: ['prenatal-basic', 'birth-doula', 'prenatal-yoga']
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
    services: ['night-nanny-premium', 'night-nanny-weekend', 'sleep-training']
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
    services: ['special-needs', 'nicu-transition', 'preemie-care']
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
    services: ['postpartum-csection', 'postpartum-basic', 'mom-wellness']
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
    services: ['prenatal-nutrition', 'nutrition-postpartum', 'lactation-weaning']
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
    services: ['newborn-twins', 'sleep-consult', 'sleep-training']
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
    services: ['postpartum-confinement', 'postpartum-premium', 'mom-wellness', 'lactation-consult']
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
    services: ['cpr-training', 'sibling-prep', 'mom-wellness']
  }
];
