import { db } from '@/db';
import { bookings } from '@/db/schema';

async function main() {
    const sampleBookings = [
        {
            name: 'John & Jane Smith',
            email: 'john.smith@example.com',
            phone: '+1-234-567-8900',
            eventType: 'Wedding',
            startDate: '2024-06-15',
            endDate: '2024-06-16',
            guestCount: 150,
            message: 'We would like white and gold decorations with a grand stage setup',
            status: 'approved',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Mike Johnson',
            email: 'mike.j@example.com',
            phone: '+1-234-567-8901',
            eventType: 'Birthday Party',
            startDate: '2024-07-20',
            endDate: '2024-07-20',
            guestCount: 80,
            message: 'Kids birthday party with balloon decorations and entertainment area',
            status: 'pending',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Tech Corp',
            email: 'events@techcorp.com',
            phone: '+1-234-567-8902',
            eventType: 'Corporate Event',
            startDate: '2024-08-10',
            endDate: '2024-08-10',
            guestCount: 200,
            message: 'Annual conference with presentation setup and catering for 200',
            status: 'approved',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Robert & Mary Wilson',
            email: 'robert.w@example.com',
            phone: '+1-234-567-8903',
            eventType: 'Anniversary',
            startDate: '2024-09-05',
            endDate: '2024-09-05',
            guestCount: 50,
            message: '50th wedding anniversary celebration with family and friends',
            status: 'pending',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'David Brown',
            email: 'david.brown@example.com',
            phone: '+1-234-567-8904',
            eventType: 'Reception',
            startDate: '2024-10-12',
            endDate: '2024-10-12',
            guestCount: 120,
            message: 'Wedding reception with DJ and dance floor',
            status: 'approved',
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(bookings).values(sampleBookings);
    
    console.log('✅ Bookings seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});