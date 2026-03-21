export interface Pet {
  id: number;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  petName: string;
  species: string;
  breed: string;
  age: number;
  weight: string;
  gender: string;
  color: string;
  vaccinated: boolean;
  lastCheckup: string;
  nextCheckup: string;
  healthStatus: 'Healthy' | 'Needs Attention' | 'Critical';
  notes: string;
  avatar: string;
}

export const pets: Pet[] = [
  { id: 1, ownerName: 'Sarah Johnson', ownerEmail: 'sarah@example.com', ownerPhone: '+1 234 567 8901', petName: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, weight: '30kg', gender: 'Male', color: 'Golden', vaccinated: true, lastCheckup: '2025-01-10', nextCheckup: '2025-07-10', healthStatus: 'Healthy', notes: 'Very active and playful. Loves outdoor activities.', avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&q=80' },
  { id: 2, ownerName: 'Mike Thompson', ownerEmail: 'mike@example.com', ownerPhone: '+1 234 567 8902', petName: 'Whiskers', species: 'Cat', breed: 'Persian', age: 5, weight: '4kg', gender: 'Female', color: 'White', vaccinated: true, lastCheckup: '2025-02-15', nextCheckup: '2025-08-15', healthStatus: 'Healthy', notes: 'Indoor cat. Prefers quiet environment.', avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80' },
  { id: 3, ownerName: 'Emily Davis', ownerEmail: 'emily@example.com', ownerPhone: '+1 234 567 8903', petName: 'Max', species: 'Dog', breed: 'German Shepherd', age: 2, weight: '35kg', gender: 'Male', color: 'Black & Tan', vaccinated: false, lastCheckup: '2024-12-01', nextCheckup: '2025-06-01', healthStatus: 'Needs Attention', notes: 'Vaccination overdue. Schedule appointment soon.', avatar: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=200&q=80' },
  { id: 4, ownerName: 'James Wilson', ownerEmail: 'james@example.com', ownerPhone: '+1 234 567 8904', petName: 'Luna', species: 'Cat', breed: 'Siamese', age: 4, weight: '3.5kg', gender: 'Female', color: 'Cream & Brown', vaccinated: true, lastCheckup: '2025-03-05', nextCheckup: '2025-09-05', healthStatus: 'Healthy', notes: 'Very vocal and social. Enjoys interactive toys.', avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&q=80' },
  { id: 5, ownerName: 'Anna Martinez', ownerEmail: 'anna@example.com', ownerPhone: '+1 234 567 8905', petName: 'Rocky', species: 'Dog', breed: 'Bulldog', age: 6, weight: '25kg', gender: 'Male', color: 'Brindle', vaccinated: true, lastCheckup: '2025-01-20', nextCheckup: '2025-07-20', healthStatus: 'Needs Attention', notes: 'Mild respiratory issues. Monitor breathing.', avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&q=80' },
  { id: 6, ownerName: 'Chris Lee', ownerEmail: 'chris@example.com', ownerPhone: '+1 234 567 8906', petName: 'Bella', species: 'Dog', breed: 'Labrador', age: 1, weight: '20kg', gender: 'Female', color: 'Black', vaccinated: true, lastCheckup: '2025-03-10', nextCheckup: '2025-09-10', healthStatus: 'Healthy', notes: 'Puppy. Full of energy. Completing vaccination schedule.', avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80' },
  { id: 7, ownerName: 'Rachel Green', ownerEmail: 'rachel@example.com', ownerPhone: '+1 234 567 8907', petName: 'Oliver', species: 'Cat', breed: 'Maine Coon', age: 7, weight: '6kg', gender: 'Male', color: 'Tabby', vaccinated: false, lastCheckup: '2024-10-15', nextCheckup: '2025-04-15', healthStatus: 'Critical', notes: 'Kidney issues detected. Requires immediate follow-up.', avatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=200&q=80' },
  { id: 8, ownerName: 'Tom Brown', ownerEmail: 'tom@example.com', ownerPhone: '+1 234 567 8908', petName: 'Daisy', species: 'Dog', breed: 'Poodle', age: 4, weight: '8kg', gender: 'Female', color: 'White', vaccinated: true, lastCheckup: '2025-02-28', nextCheckup: '2025-08-28', healthStatus: 'Healthy', notes: 'Well-groomed. Regular grooming appointments maintained.', avatar: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=200&q=80' },
];
