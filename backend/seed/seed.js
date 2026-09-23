import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import { User, Listing, Event, Emergency, Transport, Booking, Review } from '../src/models/index.js';
import { guideListings } from './guide.js';

const img=(q)=>`https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80`;

const listings=[
 {type:'destination',title:'Loktak Lake',description:'The largest freshwater lake in Northeast India, known for floating phumdis and Sendra viewpoints.',district:'Bishnupur',location:'Moirang',categories:['nature','lake'],tags:['loktak','phumdi','boating'],featured:true,coordinates:{lat:24.5507,lng:93.7848},images:[img('photo-1500530855697-b586d89ba3ee')],rating:4.8,reviewCount:128},
 {type:'destination',title:'Shirui Hills',description:'A scenic highland destination associated with the rare Shirui Lily and panoramic mountain views.',district:'Ukhrul',location:'Shirui',categories:['nature','trekking'],tags:['shirui','lily','trek'],featured:true,coordinates:{lat:25.095,lng:94.36},images:[img('photo-1464822759023-fed622ff2c3b')],rating:4.7,reviewCount:86},
 {type:'heritage',title:'Kangla Fort',description:'Historic heart of Manipur and an important cultural heritage site in Imphal.',district:'Imphal West',location:'Imphal',categories:['heritage','history'],tags:['kangla','history','culture'],featured:true,coordinates:{lat:24.8074,lng:93.9442},images:[img('photo-1524498250077-390f9e378fc0')],rating:4.7,reviewCount:102},
 {type:'adventure',title:'Dzukou Valley Trek',description:'A high-altitude valley trek popular for landscapes, seasonal flowers and camping.',district:'Senapati',location:'Dzukou Valley',categories:['trekking','camping'],tags:['trek','camping','hiking'],featured:true,coordinates:{lat:25.55,lng:94.12},images:[img('photo-1464278533981-50106e6176b1')],rating:4.8,reviewCount:74},
 {type:'homestay',title:'Loktak Lakeside Homestay',description:'Family-run stay close to Loktak Lake with local food and village experiences.',district:'Bishnupur',location:'Moirang',price:1800,priceUnit:'night',categories:['homestay'],amenities:['Wi-Fi','Breakfast','Parking','Local food'],featured:true,hostName:'Thangjam Family',capacity:{guests:4,bedrooms:2,beds:3,bathrooms:1},propertyType:'private',minStay:1,maxStay:7,houseRules:['No smoking indoors'],coordinates:{lat:24.552,lng:93.786},images:[img('photo-1564013799919-ab600027ffc6')],rating:4.6,reviewCount:42,verified:true},
 {type:'hotel',title:'Imphal Heritage Hotel',description:'Comfortable city accommodation with easy access to markets and heritage attractions.',district:'Imphal West',location:'Imphal',price:3200,priceUnit:'night',categories:['hotel'],amenities:['Wi-Fi','Restaurant','Parking','24-hour reception'],featured:true,capacity:{guests:3,bedrooms:1,beds:2,bathrooms:1},propertyType:'entire',coordinates:{lat:24.817,lng:93.936},images:[img('photo-1566073771259-6a8506099945')],rating:4.4,reviewCount:55,verified:true},
 {type:'restaurant',title:'Meitei Kitchen',description:'Local cuisine featuring traditional Manipuri dishes and seasonal ingredients.',district:'Imphal West',location:'Imphal',price:500,priceUnit:'person',categories:['Manipuri','local cuisine'],tags:['eroomba','singju','chak-hao'],featured:true,coordinates:{lat:24.814,lng:93.94},images:[img('photo-1515003197210-e0cd71810b5f')],rating:4.6,reviewCount:93,phone:'+91-0000000000'},
 {type:'shopping',title:'Authentic Manipuri Handloom',description:'Handwoven textiles and local craft products from artisan communities.',district:'Imphal East',location:'Imphal',price:1200,priceUnit:'item',categories:['handloom','handicraft'],materials:['Cotton','Natural dyes'],craftStory:'Traditional weaving knowledge passed through generations.',inStock:true,featured:true,artisan:{id:'artisan-1',name:'Local Artisan Collective',location:'Imphal East'},images:[img('photo-1606722590583-6951b5ea92ad')],rating:4.7,reviewCount:37},
 {type:'transport',title:'Airport Transfer',description:'Pre-bookable transfer between Imphal airport and major tourist areas.',district:'Imphal West',location:'Imphal Airport',price:800,priceUnit:'trip',categories:['taxi','airport'],tags:['airport','taxi'],coordinates:{lat:24.76,lng:93.896},images:[img('photo-1549317661-bd32c8ce0db2')],rating:4.5,reviewCount:18}
];

const events=[
 {title:'Sangai Festival',description:'A major celebration showcasing Manipur culture, crafts, cuisine, music and tourism.',district:'Imphal East',venue:'Imphal',category:'Festival',startDate:new Date('2026-11-21'),endDate:new Date('2026-11-30'),ticketPrice:0,featured:true},
 {title:'Yaoshang',description:'A vibrant traditional festival celebrated across Manipur.',district:'Imphal West',venue:'Imphal',category:'Cultural',startDate:new Date('2027-03-03'),endDate:new Date('2027-03-07'),ticketPrice:0,featured:true},
 {title:'Lai Haraoba',description:'Traditional Meitei cultural festival featuring rituals, music and dance.',district:'Imphal',venue:'Imphal',category:'Heritage',startDate:new Date('2027-05-01'),endDate:new Date('2027-05-05'),ticketPrice:0,featured:true}
];
const emergencies=[
 {name:'Emergency Police',type:'police',phone:'100',address:'Imphal',district:'Imphal West',available24x7:true},
 {name:'Ambulance',type:'ambulance',phone:'108',address:'Manipur',district:'All',available24x7:true},
 {name:'Fire & Emergency Services',type:'fire',phone:'101',address:'Manipur',district:'All',available24x7:true},
 {name:'Tourist Assistance',type:'tourist-help',phone:'1363',address:'Manipur',district:'All',available24x7:true}
];
const transports=[
 {name:'Imphal Airport Taxi',type:'taxi',from:'Imphal Airport',to:'Imphal City',schedule:'On demand',fare:800,contact:'+91-0000000000',district:'Imphal West',coordinates:{lat:24.76,lng:93.896}},
 {name:'Imphal–Moirang Bus',type:'bus',from:'Imphal',to:'Moirang',schedule:'Daily',fare:80,contact:'Local bus service',district:'Bishnupur'}
];

await connectDB();
await Promise.all([User.deleteMany({}),Listing.deleteMany({}),Event.deleteMany({}),Emergency.deleteMany({}),Transport.deleteMany({}),Booking.deleteMany({}),Review.deleteMany({})]);
const password=await bcrypt.hash('demo1234',12);
const [admin, provider, tourist] = await User.create([
  {
    name: 'Admin',
    email: 'admin@onemanipur.tourism',
    password,
    role: 'admin'
  },
  {
    name: 'Demo Provider',
    email: 'provider@onemanipur.tourism',
    password,
    role: 'provider'
  },
  {
    name: 'Demo Tourist',
    email: 'tourist@onemanipur.tourism',
    password,
    role: 'tourist'
  }
]);
const providerListingTitles = new Set([
  'Loktak Lakeside Homestay',
  'Imphal Heritage Hotel',
  'Meitei Kitchen',
  'Manipur Culture & Nature Guide'
]);

  const created = await Listing.insertMany(
  [...listings, ...guideListings].map(x => ({
    ...x,
    hostId: providerListingTitles.has(x.title)
      ? provider._id
      : admin._id,
    hostName: providerListingTitles.has(x.title)
      ? provider.name
      : admin.name
  }))
);
await Event.insertMany(events); await Emergency.insertMany(emergencies); await Transport.insertMany(transports);
console.log(`Seeded ${created.length} listings, ${events.length} events, ${emergencies.length} emergency contacts and ${transports.length} transport records.`);
console.log('Demo logins:');
console.log('Admin: admin@onemanipur.tourism / demo1234');
console.log('Provider: provider@onemanipur.tourism / demo1234');
console.log('Tourist: tourist@onemanipur.tourism / demo1234');
process.exit(0);
