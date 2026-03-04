import TaskerTestimonialImg1 from "../assets/login/setnewpassword.webp";
import TaskerTestimonialImg2 from "../assets/landing/tasker-testimonial-2.png";
import TaskerTestimonialImg3 from "../assets/landing/tasker-testimonial-3.png";
import { EVENT_TYPES, offerStatus, orderStatus } from "../constants/commonConstants";

export const clientsTestimonials = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    image: "https://dashboard.codeparrot.ai/api/assets/Z4uwwSAPZCF-suOb",
    quote:
      "The professionals are top-notch! I've used Tasker for plumbing and electrical work, and both experiences were fantastic. Reliable and trustworthy.",
    title: "Top-Quality Professionals You Can Rely On",
    socials: {
      twitter: "https://x.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "John D.",
    role: "Business Owner",
    image:
      "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "Tasker has been a game-changer for my business! Their prompt service and skilled workers make everything easier.",
    title: "Dependable Services for Businesses",
    socials: {
      twitter: "https://x.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Emily R.",
    role: "Freelancer",
    image:
      "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "Highly recommended! Tasker connects you with skilled professionals who deliver excellent results every time.",
    title: "Professionals You Can Trust",
    socials: {
      twitter: "https://x.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
];

export const eventDetails = [
  {
    id: 'E1001',
    title: 'Painting Workshop for Beginners',
    category: 'Art & Creativity',
    type: 'OPEN',
    recurring: true,
    host: {
      name: 'Jane Smith',
      username: '@Jane Smith',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RzcTNan_5EbUupUCwHQix0t6PHrjkJyqcQ&s',
    },
    date: '2025-09-14',
    time: '10:00 AM',
    location: {
      city: 'Kurunegala, Piliyandala, Kottawa',
      distance: '16KM',
      mapEmbedUrl: 'https://maps.google.com/?q=Kurunegala',
    },
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466',
    price: 40.20,
    currency: 'USD',
    isFree: false,
    isSubcription: true,
    buttons: {
      register: 'Book Now',
      profile: 'View Profile',
      chat: 'Chat Now',
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla.`,
    maxAttendees: 50,
    duration: 5,
  },
  {
    id: 'E1002',
    title: 'Painting Workshop for Beginners',
    category: 'Art & Creativity',
    type: 'RECURRING',
    recurring: true,
    host: {
      name: 'Jane Smith',
      username: '@Jane Smith',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RzcTNan_5EbUupUCwHQix0t6PHrjkJyqcQ&s',
    },
    date: '2025-09-14',
    time: '10:00 AM',
    location: {
      city: 'Kurunegala, Piliyandala, Kottawa',
      distance: '16KM',
      mapEmbedUrl: 'https://maps.google.com/?q=Kurunegala',
    },
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466',
    price: 40.20,
    currency: 'USD',
    isFree: false,
    buttons: {
      register: 'Book Now',
      profile: 'View Profile',
      chat: 'Chat Now',
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla.`,
    maxAttendees: 50,
    duration: 5,
  },
  {
    id: 'E1003',
    title: 'Painting Workshop for Beginners',
    category: 'Art & Creativity',
    type: 'PRIVATE',
    recurring: false,
    host: {
      name: 'Jane Smith',
      username: '@Jane Smith',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RzcTNan_5EbUupUCwHQix0t6PHrjkJyqcQ&s',
    },
    date: '2025-09-14',
    time: '10:00 AM',
    location: {
      city: 'Kurunegala',
      distance: '16KM',
      mapEmbedUrl: 'https://maps.google.com/?q=Kurunegala',
    },
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466',
    price: 40.20,
    currency: 'USD',
    isFree: false,
    buttons: {
      register: 'Book Now',
      profile: 'View Profile',
      chat: 'Chat Now',
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla.`,
    maxAttendees: 50,
    duration: 5,
  },
  {
    id: 'E1004',
    title: 'Painting Workshop for Beginners',
    category: 'Art & Creativity',
    type: 'PUBLIC',
    recurring: true,
    host: {
      name: 'Trisky Tricony',
      username: '@Trisky Tricony',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RzcTNan_5EbUupUCwHQix0t6PHrjkJyqcQ&s',
    },
    date: '2025-09-14',
    time: '10:00 AM',
    location: {
      city: 'Kurunegala',
      distance: '16KM',
      mapEmbedUrl: 'https://maps.google.com/?q=Kurunegala',
    },
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466',
    price: 40.20,
    currency: 'USD',
    isFree: false,
    buttons: {
      register: 'Book Now',
      profile: 'View Profile',
      chat: 'Chat Now',
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla  Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla imperdiet laoreet mauris, in eleifend justo facilisis at. Aenean mattis blandit hendrerit.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lacus, egestas at risus at, cursus ornare elit. Vivamus at ornare elit. Maecenas placerat urna augue, vitae euismod metus sodales at. Donec risus augue, fermentum id consectetur nec, volutpat in ligula. Vestibulum eget felis sagittis, lobortis nisi eget, varius felis. Nulla.`,
    maxAttendees: 50,
    duration: 5,
  },

  // kidsplan api date
  {
    "_id": "68531f59da1442901459edda",
    "id": "ID1016",
    "name": "Magic Show reccuring subscription",
    "price": 120.5,
    "category": "Entertainment",
    "paymentMethod": [
      "ONLINE",
      "INHOUSE",
      "SUBSCRIPTION"
    ],
    "description": "Good kids show",
    "maximumAttendees": 20,
    "currentAttendees": 0,
    "flyer": [
      "https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466",
      "https://example.com/image2.png"
    ],
    "eventType": "PUBLIC",
    "eventLocations": [
      // {
      //   "address": "123 Main Street, New York, NY",
      //   "placeId": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      //   "location": {
      //     "type": "Point",
      //     "coordinates": [
      //       79.8612,
      //       6.9271
      //     ]
      //   },
      //   "_id": "68531f59da1442901459eddb",
      //   "createdAt": "2025-06-18T20:19:37.708Z",
      //   "updatedAt": "2025-06-18T20:19:37.708Z"
      // }
      {
        "address": "10 Downing St, Westminster, London SW1A 2AA, UK",
        "placeId": "ChIJ7aVxnOTHh0gRjH7-W5qP2jU",
        "location": {
          "type": "Point",
          "coordinates": [
            -0.127758,
            51.507351
          ]
        },
        "_id": "98531f59da1442901459eddb",
        "createdAt": "2025-06-18T23:19:37.708Z",
        "updatedAt": "2025-06-18T23:19:37.708Z"
      },
    ],
    "eventStartDate": "2025-06-24T18:30:00.000Z",
    "eventEndDate": "2025-07-14T18:30:00.000Z",
    "recurringEventsDates": [
      {
        "start": "2025-06-25T09:00:00.000Z",
        "end": "2025-06-25T10:00:00.000Z",
        "_id": "68531f59da1442901459eddc"
      },
      {
        "start": "2025-07-02T09:00:00.000Z",
        "end": "2025-07-02T10:00:00.000Z",
        "_id": "68531f59da1442901459eddd"
      },
      {
        "start": "2025-07-09T09:00:00.000Z",
        "end": "2025-07-09T10:00:00.000Z",
        "_id": "68531f59da1442901459edde"
      }
    ],
    "startingTime": "2025-06-25T09:00:00.000Z",
    "endingTime": "2025-06-25T10:00:00.000Z",
    "schedulingType": "RECURRING",
    "organizer": {
      "_id": "684ecebbdb1d5dced09935fc",
      "id": "ID1003",
      "firstName": "Chamalka",
      "lastName": "Marasinghe",
      "email": "chamalkaauth@freesourcecodes.com",
      "password": "$2a$12$T49utatWK81jvfUW8VVV2u5/bC.KYtnhPgYcqEWaKf1M.9RuScpsm",
      "roles": [
        "SERVICE_PRO"
      ],
      "wallet": {
        "amount": 0,
        "pending": 0,
        "_id": "684ecebbdb1d5dced09935fb",
        "createdAt": "2025-06-15T13:46:35.435Z",
        "updatedAt": "2025-06-15T13:46:35.435Z"
      },
      "isOnboardingCompleted": true,
      "isOnboardingVerified": true,
      "isOnboardingRejected": false,
      "isStillProcessing": false,
      "createdAt": "2025-06-15T13:46:35.436Z",
      "updatedAt": "2025-06-15T14:04:36.689Z",
      "__v": 0,
      "businessInformation": {
        "name": "Chamaqlka pvt LTD",
        "taxId": "taqx001",
        "address": "no32/1 welimada srilanka",
        "placeId": "place001",
        "location": {
          "type": "Point",
          "coordinates": [
            6.123456789,
            6.123456789
          ]
        },
        "logo": [
          "https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466"
        ],
        "cover": [
          "https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466"
        ],
        "gallery": [
          "https://images.immediate.co.uk/production/volatile/sites/3/2025/03/DSICDateAnnouncementKV2x3UK-1-Cropped-5bb23a9.png?quality=90&fit=700,466",
          "https://yt.com"
        ],
        "link": "https://youtube.com",
        "expirience": 3,
        "category": "entertainment, funny",
        "description": "stand up comedy show",
        "_id": "684ed2e56da7073e0609d95f",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRequestdAt": "2025-06-15T14:04:21.369Z",
      "personalInformation": {
        "firstName": "Chamalka",
        "lastName": "Marasinghe",
        "email": "chawmalkaauth@freesourcec4odes.com",
        "phoneNumber": "0331032143",
        "idType": "Type 1",
        "idNumber": "84022124030200V",
        "idPhotos": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "address": "welimda town, srilanka",
        "addressProof": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "_id": "684ed2e56da7073e0609d95e",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRejectedAt": "2025-06-15T14:03:58.368Z",
      "onboardingRejectionReason": "fakee",
      "onboardingApprovedAt": "2025-06-15T14:04:36.687Z"
    },
    "createdAt": "2025-06-18T20:19:37.709Z",
    "updatedAt": "2025-06-18T20:19:37.709Z",
    "__v": 0
  },
  {
    "_id": "68531cc8da1442901459edc7",
    "id": "ID1015",
    "name": "Magic Show Recurring Public",
    "price": 120.5,
    "category": "Entertainment",
    "paymentMethod": [
      "ONLINE",
      "INHOUSE"
    ],
    "description": "Good kids show",
    "maximumAttendees": 20,
    "currentAttendees": 0,
    "flyer": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.png"
    ],
    "eventType": "PUBLIC",
    "eventLocations": [
      {
        "address": "10 Downing St, Westminster, London SW1A 2AA, UK",
        "placeId": "ChIJ7aVxnOTHh0gRjH7-W5qP2jU",
        "location": {
          "type": "Point",
          "coordinates": [
            -0.127758,
            51.507351
          ]
        },
        "_id": "98531f59da1442901459eddb",
        "createdAt": "2025-06-18T23:19:37.708Z",
        "updatedAt": "2025-06-18T23:19:37.708Z"
      },
    ],
    "eventStartDate": "2025-06-24T18:30:00.000Z",
    "eventEndDate": "2025-07-14T18:30:00.000Z",
    "recurringEventsDates": [
      {
        "start": "2025-06-25T09:00:00.000Z",
        "end": "2025-06-25T10:00:00.000Z",
        "_id": "68531cc8da1442901459edc9"
      },
      {
        "start": "2025-07-02T09:00:00.000Z",
        "end": "2025-07-02T10:00:00.000Z",
        "_id": "68531cc8da1442901459edca"
      },
      {
        "start": "2025-07-09T09:00:00.000Z",
        "end": "2025-07-09T10:00:00.000Z",
        "_id": "68531cc8da1442901459edcb"
      }
    ],
    "startingTime": "2025-06-25T09:00:00.000Z",
    "endingTime": "2025-06-25T10:00:00.000Z",
    "schedulingType": "RECURRING",
    "organizer": {
      "_id": "684ecebbdb1d5dced09935fc",
      "id": "ID1003",
      "firstName": "Chamalka",
      "lastName": "Marasinghe",
      "email": "chamalkaauth@freesourcecodes.com",
      "password": "$2a$12$T49utatWK81jvfUW8VVV2u5/bC.KYtnhPgYcqEWaKf1M.9RuScpsm",
      "roles": [
        "SERVICE_PRO"
      ],
      "wallet": {
        "amount": 0,
        "pending": 0,
        "_id": "684ecebbdb1d5dced09935fb",
        "createdAt": "2025-06-15T13:46:35.435Z",
        "updatedAt": "2025-06-15T13:46:35.435Z"
      },
      "isOnboardingCompleted": true,
      "isOnboardingVerified": true,
      "isOnboardingRejected": false,
      "isStillProcessing": false,
      "createdAt": "2025-06-15T13:46:35.436Z",
      "updatedAt": "2025-06-15T14:04:36.689Z",
      "__v": 0,
      "businessInformation": {
        "name": "Chamaqlka pvt LTD",
        "taxId": "taqx001",
        "address": "no32/1 welimada srilanka",
        "placeId": "place001",
        "location": {
          "type": "Point",
          "coordinates": [
            6.123456789,
            6.123456789
          ]
        },
        "logo": [
          "https://youtube.com"
        ],
        "cover": [
          "https://youtube.com"
        ],
        "gallery": [
          "https://youtube.com",
          "https://yt.com"
        ],
        "link": "https://youtube.com",
        "expirience": 3,
        "category": "entertainment, funny",
        "description": "stand up comedy show",
        "_id": "684ed2e56da7073e0609d95f",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRequestdAt": "2025-06-15T14:04:21.369Z",
      "personalInformation": {
        "firstName": "Chamalka",
        "lastName": "Marasinghe",
        "email": "chawmalkaauth@freesourcec4odes.com",
        "phoneNumber": "0331032143",
        "idType": "Type 1",
        "idNumber": "84022124030200V",
        "idPhotos": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "address": "welimda town, srilanka",
        "addressProof": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "_id": "684ed2e56da7073e0609d95e",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRejectedAt": "2025-06-15T14:03:58.368Z",
      "onboardingRejectionReason": "fakee",
      "onboardingApprovedAt": "2025-06-15T14:04:36.687Z"
    },
    "createdAt": "2025-06-18T20:08:40.089Z",
    "updatedAt": "2025-06-18T20:08:40.089Z",
    "__v": 0
  },
  {
    "_id": "685318c1da1442901459ed9a",
    "id": "ID1014",
    "name": "Magic Show Onetime Private",
    "price": 120.5,
    "category": "Entertainment",
    "paymentMethod": [
      "ONLINE",
      "INHOUSE"
    ],
    "description": "Good kids show",
    "maximumAttendees": 20,
    "currentAttendees": 0,
    "flyer": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.png"
    ],
    "eventType": "PRIVATE",
    "eventLocations": [
      {
        "address": "10 Downing St, Westminster, London SW1A 2AA, UK",
        "placeId": "ChIJ7aVxnOTHh0gRjH7-W5qP2jU",
        "location": {
          "type": "Point",
          "coordinates": [
            -0.127758,
            51.507351
          ]
        },
        "_id": "98531f59da1442901459eddb",
        "createdAt": "2025-06-18T23:19:37.708Z",
        "updatedAt": "2025-06-18T23:19:37.708Z"
      },
    ],
    "date": "2025-06-25T09:00:00.000Z",
    "startingTime": "2025-06-25T09:00:00.000Z",
    "endingTime": "2025-06-25T10:00:00.000Z",
    "schedulingType": "ONETIME",
    "organizer": {
      "_id": "684ecebbdb1d5dced09935fc",
      "id": "ID1003",
      "firstName": "Chamalka",
      "lastName": "Marasinghe",
      "email": "chamalkaauth@freesourcecodes.com",
      "password": "$2a$12$T49utatWK81jvfUW8VVV2u5/bC.KYtnhPgYcqEWaKf1M.9RuScpsm",
      "roles": [
        "SERVICE_PRO"
      ],
      "wallet": {
        "amount": 0,
        "pending": 0,
        "_id": "684ecebbdb1d5dced09935fb",
        "createdAt": "2025-06-15T13:46:35.435Z",
        "updatedAt": "2025-06-15T13:46:35.435Z"
      },
      "isOnboardingCompleted": true,
      "isOnboardingVerified": true,
      "isOnboardingRejected": false,
      "isStillProcessing": false,
      "createdAt": "2025-06-15T13:46:35.436Z",
      "updatedAt": "2025-06-15T14:04:36.689Z",
      "__v": 0,
      "businessInformation": {
        "name": "Chamaqlka pvt LTD",
        "taxId": "taqx001",
        "address": "no32/1 welimada srilanka",
        "placeId": "place001",
        "location": {
          "type": "Point",
          "coordinates": [
            6.123456789,
            6.123456789
          ]
        },
        "logo": [
          "https://youtube.com"
        ],
        "cover": [
          "https://youtube.com"
        ],
        "gallery": [
          "https://youtube.com",
          "https://yt.com"
        ],
        "link": "https://youtube.com",
        "expirience": 3,
        "category": "entertainment, funny",
        "description": "stand up comedy show",
        "_id": "684ed2e56da7073e0609d95f",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRequestdAt": "2025-06-15T14:04:21.369Z",
      "personalInformation": {
        "firstName": "Chamalka",
        "lastName": "Marasinghe",
        "email": "chawmalkaauth@freesourcec4odes.com",
        "phoneNumber": "0331032143",
        "idType": "Type 1",
        "idNumber": "84022124030200V",
        "idPhotos": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "address": "welimda town, srilanka",
        "addressProof": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "_id": "684ed2e56da7073e0609d95e",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRejectedAt": "2025-06-15T14:03:58.368Z",
      "onboardingRejectionReason": "fakee",
      "onboardingApprovedAt": "2025-06-15T14:04:36.687Z"
    },
    "recurringEventsDates": [],
    "createdAt": "2025-06-18T19:51:29.609Z",
    "updatedAt": "2025-06-18T19:51:29.609Z",
    "__v": 0
  },
  {
    "_id": "68530b6cda1442901459ed77",
    "id": "ID1013",
    "name": "Magic Show Onetime Open",
    "price": 120.5,
    "category": "Entertainment",
    "paymentMethod": [
      "ONLINE",
      "INHOUSE"
    ],
    "description": "Good kids show",
    "maximumAttendees": 20,
    "currentAttendees": 0,
    "flyer": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.png"
    ],
    "eventType": "OPEN",
    "eventLocations": [
      {
        "address": "Colombo City Centre, Colombo 02, Sri Lanka",
        "placeId": "ChIJJ-fWfZ49_joRz7TVDIXoRKo",
        "location": {
          "type": "Point",
          "coordinates": [
            79.8566,
            6.9271
          ]
        },
        "_id": "A8531f59da1442901459eddb",
        "createdAt": "2025-06-19T00:19:37.708Z",
        "updatedAt": "2025-06-19T00:19:37.708Z"
      },
      {
        "address": "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
        "placeId": "ChIJj61dQgK6j4AR4GeTYWZsKWw",
        "location": {
          "type": "Point",
          "coordinates": [
            -122.0842499,
            37.4224764
          ]
        },
        "_id": "68531f59da1442901459eddb",
        "createdAt": "2025-06-18T20:19:37.708Z",
        "updatedAt": "2025-06-18T20:19:37.708Z"
      },
      {
        "address": "350 Fifth Avenue, New York, NY 10118, USA (Empire State Building)",
        "placeId": "ChIJaXQRs6lZwokRY6EFpJnhNNE",
        "location": {
          "type": "Point",
          "coordinates": [
            -73.985656,
            40.748817
          ]
        },
        "_id": "78531f59da1442901459eddb",
        "createdAt": "2025-06-18T21:19:37.708Z",
        "updatedAt": "2025-06-18T21:19:37.708Z"
      },
      {
        "address": "Eiffel Tower, Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
        "placeId": "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
        "location": {
          "type": "Point",
          "coordinates": [
            2.294481,
            48.858370
          ]
        },
        "_id": "88531f59da1442901459eddb",
        "createdAt": "2025-06-18T22:19:37.708Z",
        "updatedAt": "2025-06-18T22:19:37.708Z"
      },
      {
        "address": "10 Downing St, Westminster, London SW1A 2AA, UK",
        "placeId": "ChIJ7aVxnOTHh0gRjH7-W5qP2jU",
        "location": {
          "type": "Point",
          "coordinates": [
            -0.127758,
            51.507351
          ]
        },
        "_id": "98531f59da1442901459eddb",
        "createdAt": "2025-06-18T23:19:37.708Z",
        "updatedAt": "2025-06-18T23:19:37.708Z"
      },
    ],
    "date": "2025-06-25T09:00:00.000Z",
    "startingTime": "2025-06-25T09:00:00.000Z",
    "endingTime": "2025-06-25T10:00:00.000Z",
    "schedulingType": "ONETIME",
    "organizer": {
      "_id": "684ecebbdb1d5dced09935fc",
      "id": "ID1003",
      "firstName": "Chamalka",
      "lastName": "Marasinghe",
      "email": "chamalkaauth@freesourcecodes.com",
      "password": "$2a$12$T49utatWK81jvfUW8VVV2u5/bC.KYtnhPgYcqEWaKf1M.9RuScpsm",
      "roles": [
        "SERVICE_PRO"
      ],
      "wallet": {
        "amount": 0,
        "pending": 0,
        "_id": "684ecebbdb1d5dced09935fb",
        "createdAt": "2025-06-15T13:46:35.435Z",
        "updatedAt": "2025-06-15T13:46:35.435Z"
      },
      "isOnboardingCompleted": true,
      "isOnboardingVerified": true,
      "isOnboardingRejected": false,
      "isStillProcessing": false,
      "createdAt": "2025-06-15T13:46:35.436Z",
      "updatedAt": "2025-06-15T14:04:36.689Z",
      "__v": 0,
      "businessInformation": {
        "name": "Chamaqlka pvt LTD",
        "taxId": "taqx001",
        "address": "no32/1 welimada srilanka",
        "placeId": "place001",
        "location": {
          "type": "Point",
          "coordinates": [
            6.123456789,
            6.123456789
          ]
        },
        "logo": [
          "https://youtube.com"
        ],
        "cover": [
          "https://youtube.com"
        ],
        "gallery": [
          "https://youtube.com",
          "https://yt.com"
        ],
        "link": "https://youtube.com",
        "expirience": 3,
        "category": "entertainment, funny",
        "description": "stand up comedy show",
        "_id": "684ed2e56da7073e0609d95f",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRequestdAt": "2025-06-15T14:04:21.369Z",
      "personalInformation": {
        "firstName": "Chamalka",
        "lastName": "Marasinghe",
        "email": "chawmalkaauth@freesourcec4odes.com",
        "phoneNumber": "0331032143",
        "idType": "Type 1",
        "idNumber": "84022124030200V",
        "idPhotos": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "address": "welimda town, srilanka",
        "addressProof": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "_id": "684ed2e56da7073e0609d95e",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRejectedAt": "2025-06-15T14:03:58.368Z",
      "onboardingRejectionReason": "fakee",
      "onboardingApprovedAt": "2025-06-15T14:04:36.687Z"
    },
    "recurringEventsDates": [],
    "createdAt": "2025-06-18T18:54:36.215Z",
    "updatedAt": "2025-06-18T18:54:36.215Z",
    "__v": 0
  },
  {
    "_id": "6852f8898306173bac621da2",
    "id": "ID1012",
    "name": "Magic Show Onetime Public",
    "price": 120.5,
    "category": "Entertainment",
    "paymentMethod": [
      "ONLINE",
      "INHOUSE"
    ],
    "description": "Good kids show",
    "maximumAttendees": 20,
    "currentAttendees": 0,
    "flyer": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.png"
    ],
    "eventType": "PUBLIC",
    "eventLocations": [
      {
        "address": "10 Downing St, Westminster, London SW1A 2AA, UK",
        "placeId": "ChIJ7aVxnOTHh0gRjH7-W5qP2jU",
        "location": {
          "type": "Point",
          "coordinates": [
            -0.127758,
            51.507351
          ]
        },
        "_id": "98531f59da1442901459eddb",
        "createdAt": "2025-06-18T23:19:37.708Z",
        "updatedAt": "2025-06-18T23:19:37.708Z"
      },
    ],
    "date": "2025-06-25T09:00:00.000Z",
    "startingTime": "2025-06-25T09:00:00.000Z",
    "endingTime": "2025-06-25T10:00:00.000Z",
    "schedulingType": "ONETIME",
    "organizer": {
      "_id": "684ecebbdb1d5dced09935fc",
      "id": "ID1003",
      "firstName": "Chamalka",
      "lastName": "Marasinghe",
      "email": "chamalkaauth@freesourcecodes.com",
      "password": "$2a$12$T49utatWK81jvfUW8VVV2u5/bC.KYtnhPgYcqEWaKf1M.9RuScpsm",
      "roles": [
        "SERVICE_PRO"
      ],
      "wallet": {
        "amount": 0,
        "pending": 0,
        "_id": "684ecebbdb1d5dced09935fb",
        "createdAt": "2025-06-15T13:46:35.435Z",
        "updatedAt": "2025-06-15T13:46:35.435Z"
      },
      "isOnboardingCompleted": true,
      "isOnboardingVerified": true,
      "isOnboardingRejected": false,
      "isStillProcessing": false,
      "createdAt": "2025-06-15T13:46:35.436Z",
      "updatedAt": "2025-06-15T14:04:36.689Z",
      "__v": 0,
      "businessInformation": {
        "name": "Chamaqlka pvt LTD",
        "taxId": "taqx001",
        "address": "no32/1 welimada srilanka",
        "placeId": "place001",
        "location": {
          "type": "Point",
          "coordinates": [
            6.123456789,
            6.123456789
          ]
        },
        "logo": [
          "https://youtube.com"
        ],
        "cover": [
          "https://youtube.com"
        ],
        "gallery": [
          "https://youtube.com",
          "https://yt.com"
        ],
        "link": "https://youtube.com",
        "expirience": 3,
        "category": "entertainment, funny",
        "description": "stand up comedy show",
        "_id": "684ed2e56da7073e0609d95f",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRequestdAt": "2025-06-15T14:04:21.369Z",
      "personalInformation": {
        "firstName": "Chamalka",
        "lastName": "Marasinghe",
        "email": "chawmalkaauth@freesourcec4odes.com",
        "phoneNumber": "0331032143",
        "idType": "Type 1",
        "idNumber": "84022124030200V",
        "idPhotos": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "address": "welimda town, srilanka",
        "addressProof": [
          "https://youtube.com",
          "https://youtube.com"
        ],
        "_id": "684ed2e56da7073e0609d95e",
        "createdAt": "2025-06-15T14:04:21.371Z",
        "updatedAt": "2025-06-15T14:04:21.371Z"
      },
      "onboardingRejectedAt": "2025-06-15T14:03:58.368Z",
      "onboardingRejectionReason": "fakee",
      "onboardingApprovedAt": "2025-06-15T14:04:36.687Z"
    },
    "recurringEventsDates": [],
    "createdAt": "2025-06-18T17:34:01.896Z",
    "updatedAt": "2025-06-18T17:34:01.896Z",
    "__v": 0
  }
];

export const locationsCordinates = [
  {
    key: 'kesbewa',
    cordinates: { lat: 6.8011, lng: 79.9402 }
  },
  {
    key: 'piliyandala',
    cordinates: { lat: 6.8016, lng: 79.9272 }
  },
  {
    key: 'moratuwa',
    cordinates: { lat: 6.7730, lng: 79.8816 }
  },
  {
    key: 'kottawa',
    cordinates: { lat: 6.8416, lng: 79.9651 }
  }
];

export const taskersTestimonials = [
  {
    name: "Sarah Bennett",
    role: "Handyman Specialist (Plumbing & Repairs)",
    image: TaskerTestimonialImg1,
    quote:
      "This platform has been a game-changer for me. The secure payment system ensures I get paid on time, and the real-time notifications help me stay on top of new opportunities. Highly recommend it to all professionals!",
    title: "Secure Payments, Zero Hassle",
    socials: {
      twitter: "https://x.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Emma Taylor",
    role: "Furniture Assembly Expert",
    image: TaskerTestimonialImg2,
    quote:
      "I love how user-friendly the dashboard is! It makes managing my tasks and client communication so seamless. Plus, having access to a larger client base has significantly boosted my bookings.",
    title: "Connecting with More Clients, Effortlessly",
    socials: {
      twitter: "https://x.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Olivia Carter",
    role: "Electrical Maintenance Specialist",
    image: TaskerTestimonialImg3,
    quote:
      "The flexible work hours feature is my favorite. I can choose tasks that fit my schedule, and the platform ensures secure and hassle-free payments. It’s the best way to connect with clients.",
    title: "Flexible Work That Fits My Schedule",
    socials: {
      twitter: "https://x.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
];

export const categories = [
  { _id: "1", name: "General Handyman Services" },
  { _id: "2", name: "Home Service" },
  { _id: "3", name: "Plumbing Services" },
  { _id: "4", name: "Electrical Services" },
  { _id: "5", name: "Painting and Decorating" },
  { _id: "6", name: "Cleaning Services" },
  { _id: "7", name: "Moving Assistance" },
  { _id: "8", name: "Outdoor Work" },
  { _id: "9", name: "Home Renovation Support" },
  { _id: "10", name: "Personal Assistance" },
  { _id: "11", name: "Delivery Services" },
  { _id: "12", name: "Office and Business Services" },
  { _id: "13", name: "Technology Support" },
  { _id: "14", name: "Creative Services" },
  { _id: "15", name: "Events and Parties" },
  { _id: "16", name: "Education and Tutoring" },
  { _id: "17", name: "Odd Jobs" },
  { _id: "18", name: "Lifestyle Services" },
  { _id: "19", name: "Specialized Services" },
  { _id: "20", name: "Tailor Services" },
  { _id: "21", name: "Photography Services" },
  { _id: "22", name: "Gardening Services" },
];

export const skills = [
  { _id: "1", category_id: "1", name: "Dusting" },
  { _id: "2", category_id: "1", name: "Mopping" },
  { _id: "3", category_id: "2", name: "Lawn Mowing" },
  { _id: "4", category_id: "2", name: "Hedge Trimming" },
  { _id: "5", category_id: "3", name: "Pipe Fitting" },
  { _id: "6", category_id: "3", name: "Leak Fixing" },
  { _id: "7", category_id: "4", name: "Wiring" },
  { _id: "8", category_id: "4", name: "Appliance Repair" },
  { _id: "9", category_id: "5", name: "Wall Painting" },
  { _id: "10", category_id: "5", name: "Spray Painting" },
  { _id: "11", category_id: "6", name: "Furniture Assembly" },
  { _id: "12", category_id: "6", name: "Wood Polishing" },
];

export const cities = [
  { _id: "1", name: "Accra" },
  { _id: "2", name: "Kumasi" },
  { _id: "3", name: "Tamale" },
  { _id: "4", name: "Takoradi" },
  { _id: "5", name: "Tema" },
  { _id: "6", name: "Cape Coast" },
  { _id: "7", name: "Koforidua" },
  { _id: "8", name: "Ho" },
  { _id: "9", name: "Bolgatanga" },
  { _id: "10", name: "Sunyani" },
  { _id: "11", name: "Wa" },
  { _id: "12", name: "Nkawkaw" },
  { _id: "13", name: "Obuasi" },
  { _id: "14", name: "Dunkwa-on-Offin" },
  { _id: "15", name: "Techiman" },
  { _id: "16", name: "Tarkwa" },
  { _id: "17", name: "Konongo" },
  { _id: "18", name: "Winneba" },
  { _id: "19", name: "Mampong" },
  { _id: "20", name: "Bibiani" },
];

export const subcities = [
  { _id: "1-1", name: "Madina", cityId: "1" },
  { _id: "1-2", name: "Osu", cityId: "1" },
  { _id: "1-3", name: "Dansoman", cityId: "1" },
  { _id: "1-4", name: "Spintex", cityId: "1" },

  { _id: "2-1", name: "Asokwa", cityId: "2" },
  { _id: "2-2", name: "Suame", cityId: "2" },
  { _id: "2-3", name: "Bantama", cityId: "2" },

  { _id: "3-1", name: "Lamashegu", cityId: "3" },
  { _id: "3-2", name: "Choggu", cityId: "3" },
  { _id: "3-3", name: "Gumbihini", cityId: "3" },
];

export const servicesPros = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Accra",
    rating: 4.5,
    reviews: 100,
    profilePicture:
      "https://dashboard.codeparrot.ai/api/image/Z5eCQtgGlUAkMdK1/ellipse.png",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Kumasi",
    rating: 4.0,
    reviews: 80,
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1664298589198-b15ff5382648?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGx1bWJlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Tamale",
    rating: 4.2,
    reviews: 90,
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1679765934200-d1cb3153c631?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R2FyZGVuaW5nfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Takoradi",
    rating: 4,
    reviews: 95,
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1661929137248-2544fd28de13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWxlY3RyY2llbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    firstName: "Eve",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Tema",
    rating: 4.3,
    reviews: 85,
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1679500354245-ce715b79a606?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHJvb20lMjBjbGVhbmVyfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    firstName: "Charlie",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Cape Coast",
    rating: 4.4,
    reviews: 75,
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1677151140434-302945fcc26a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENhcnBlbnRlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Doe",
    professionalDetails: [
      {
        categoryName: "General Handyman Services",
        skills: [
          {
            name: "Furniture Assembly",
            description: "I can assemble all types of furniture",
          },
          {
            name: "Hanging Pictures and Shelves",
            description: "I can hang pictures and shelves",
          },
          {
            name: "Door Repair",
            description: "I can repair doors",
          },
          {
            name: "Lock Replacement",
            description: "I can replace locks",
          },
          {
            name: "Basic Carpentry Work",
            description: "I can do basic carpentry work",
          },
          {
            name: "Window Repair",
            description: "I can repair windows",
          },
          {
            name: "Curtain and Blinds Installation",
            description: "I can install curtains and blinds",
          },
        ],
      },
      {
        categoryName: "Home Services",
        skills: [
          {
            name: "Moving Help",
            description: "I can help you move your stuff",
          },
          {
            name: "Pest Control Assistance",
            description: "I can help you with pest control",
          },
          {
            name: "Home Organization (closet, kitchen, etc.)",
            description: "I can help you organize your home",
          },
        ],
      },
    ],
    location: "Koforidua",
    rating: 4.6,
    reviews: 105,
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const clientReviews = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Homeowner",
    image:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    quote:
      "The professionals are top-notch! I've used Tasker for plumbing and electrical work, and both experiences were fantastic. Reliable and trustworthy.",
    rating: 5,
    date: "2024-05-31",
    price: "$150.00",
  },
  {
    id: 2,
    name: "John D.",
    role: "Business Owner",
    image:
      "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "Tasker has been a game-changer for my business! Their prompt service and skilled workers make everything easier.",
    rating: 4,
    date: "2024-06-01",
    price: "$200.00",
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Freelancer",
    image:
      "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "Highly recommended! Tasker connects you with skilled professionals who deliver excellent results every time.",
    rating: 4.5,
    date: "2024-06-02",
    price: "$250.00",
  },
  {
    id: 4,
    name: "Mark S.",
    role: "Homeowner",
    image:
      "https://plus.unsplash.com/premium_photo-1679765934200-d1cb3153c631?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R2FyZGVuaW5nfGVufDB8fDB8fHww",
    quote:
      "Tasker is the best! I've used them for multiple projects and have never been disappointed. Great service!",
    rating: 4.2,
    date: "2024-06-03",
    price: "$300.00",
  },
  {
    id: 5,
    name: "Alice W.",
    role: "Business Owner",
    image:
      "https://plus.unsplash.com/premium_photo-1664298589198-b15ff5382648?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGx1bWJlcnxlbnwwfHwwfHx8MA%3D%3D",
    quote:
      "I've been using Tasker for years and they never disappoint. Great service and great people!",
    rating: 4.3,
    date: "2024-06-04",
    price: "$350.00",
  },
  {
    id: 6,
    name: "David M.",
    role: "Freelancer",
    image:
      "https://plus.unsplash.com/premium_photo-1661664680618-7f10c69d1075?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "Tasker is the best! I've used them for multiple projects and have never been disappointed. Great service!",
    rating: 4.4,
    date: "2024-06-05",
    price: "$400.00",
  },
  {
    id: 7,
    name: "Eve S.",
    role: "Homeowner",
    image:
      "https://plus.unsplash.com/premium_photo-1679500354245-ce715b79a606?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHJvb20lMjBjbGVhbmVyfGVufDB8fDB8fHww",
    quote:
      "Tasker is the best! I've used them for multiple projects and have never been disappointed. Great service!",
    rating: 4.6,
    date: "2024-06-06",
    price: "$450.00",
  },
  {
    id: 8,
    name: "Frank D.",
    role: "Business Owner",
    image:
      "https://plus.unsplash.com/premium_photo-1661929137248-2544fd28de13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWxlY3RyY2llbnxlbnwwfHwwfHx8MA%3D%3D",
    quote:
      "Tasker is the best! I've used them for multiple projects and have never been disappointed. Great service!",
    rating: 4.7,
    date: "2024-06-07",
    price: "$500.00",
  },
  {
    id: 9,
    name: "Grace M.",
    role: "Freelancer",
    image:
      "https://plus.unsplash.com/premium_photo-1677151140434-302945fcc26a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENhcnBlbnRlcnxlbnwwfHwwfHx8MA%3D%3D",
    quote:
      "Tasker is the best! I've used them for multiple projects and have never been disappointed. Great service!",
    rating: 4.8,
    date: "2024-06-08",
    price: "$550.00",
  },
  {
    id: 10,
    name: "Hannah D.",
    role: "Homeowner",
    image:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    quote:
      "Tasker is the best! I've used them for multiple projects and have never been disappointed. Great service!",
    rating: 4.9,
    date: "2024-06-09",
    price: "$600.00",
  },
];

export const orderHistory = [
  {
    _id: "1",
    orderId: "1001",
    orderDate: "2024-12-20T09:50:13.862+00:00",
    orderStatus: orderStatus.IN_PROGRESS,
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "John",
      lastName: "Doe",
    },
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
    ],
    amount: 200,
  },
  {
    _id: "2",
    orderId: "1002",
    orderDate: "2024-12-21T09:50:13.862+00:00",
    orderStatus: orderStatus.IN_REVISION,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.IN_REVISION,
        date: "2024-12-21T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Jane",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "3",
    orderId: "1003",
    orderDate: "2024-12-22T09:50:13.862+00:00",
    orderStatus: orderStatus.COMPLETED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLETED,
        date: "2024-12-22T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Alice",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "4",
    orderId: "1004",
    orderDate: "2024-12-23T09:50:13.862+00:00",
    orderStatus: orderStatus.COMPLAINT_RAISED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLETED,
        date: "2024-12-22T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLAINT_RAISED,
        date: "2024-12-23T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Bob",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "5",
    orderId: "1005",
    orderDate: "2024-12-24T09:50:13.862+00:00",
    orderStatus: orderStatus.RESOLVED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLETED,
        date: "2024-12-22T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLAINT_RAISED,
        date: "2024-12-23T09:50:13.862+00:00",
      },
      {
        status: orderStatus.RESOLVED,
        date: "2024-12-24T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Eve",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "6",
    orderId: "1006",
    orderDate: "2024-12-25T09:50:13.862+00:00",
    orderStatus: orderStatus.COMPLETED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.IN_REVISION,
        date: "2024-12-22T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-23T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLETED,
        date: "2024-12-25T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Charlie",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "7",
    orderId: "1007",
    orderDate: "2024-12-26T09:50:13.862+00:00",
    orderStatus: orderStatus.DELIVERED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "David",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "8",
    orderId: "1008",
    orderDate: "2024-12-27T09:50:13.862+00:00",
    orderStatus: orderStatus.IN_PROGRESS,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Eva",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "9",
    orderId: "1009",
    orderDate: "2024-12-28T09:50:13.862+00:00",
    orderStatus: orderStatus.COMPLAINT_RAISED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLETED,
        date: "2024-12-22T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLAINT_RAISED,
        date: "2024-12-23T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Frank",
      lastName: "Doe",
    },
    amount: 200,
  },
  {
    _id: "10",
    orderId: "1010",
    orderDate: "2024-12-29T09:50:13.862+00:00",
    orderStatus: orderStatus.COMPLETED,
    orderFlow: [
      {
        status: orderStatus.IN_PROGRESS,
        date: "2024-12-20T09:50:13.862+00:00",
      },
      {
        status: orderStatus.DELIVERED,
        date: "2024-12-21T09:50:13.862+00:00",
      },
      {
        status: orderStatus.COMPLETED,
        date: "2024-12-22T09:50:13.862+00:00",
      },
    ],
    taskTitle: "Plumbing Repair and Electrical Checkup",
    tasker: {
      firstName: "Grace",
      lastName: "Doe",
    },
    amount: 200,
  },
];

export const taskers = [
  {
    userId: "T001",
    name: "Michael Smith",
    firstName: "Michael",
    lastName: "Smith",
    role: "TASKER",
    category: "Plumber",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: true,
    lastMessageTime: "5min ago",
    unreadCount: 2,
  },
  {
    userId: "T002",
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    role: "TASKER",
    category: "Electrician",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: false,
    lastMessageTime: "2h ago",
    unreadCount: 0,
  },
  {
    userId: "T003",
    name: "Emma Watson",
    firstName: "Emma",
    lastName: "W.",
    role: "TASKER",
    category: "Interior Designer",
    avatar: "",
    isOnline: false,
    isTyping: false,
    lastMessageTime: "1d ago",
    unreadCount: 1,
  },
  {
    userId: "T004",
    name: "Michael R.",
    firstName: "Michael",
    lastName: "R.",
    role: "TASKER",
    category: "Carpenter",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: false,
    lastMessageTime: "3d ago",
    unreadCount: 0,
  },

  {
    userId: "T001",
    name: "Michael Smith",
    firstName: "Michael",
    lastName: "Smith",
    role: "TASKER",
    category: "Plumber",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: true,
    lastMessageTime: "5min ago",
    unreadCount: 2,
  },
  {
    userId: "T002",
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    role: "TASKER",
    category: "Electrician",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: false,
    lastMessageTime: "2h ago",
    unreadCount: 0,
  },
  {
    userId: "T003",
    name: "Emma Watson",
    firstName: "Emma",
    lastName: "W.",
    role: "TASKER",
    category: "Interior Designer",
    avatar: "",
    isOnline: false,
    isTyping: false,
    lastMessageTime: "1d ago",
    unreadCount: 1,
  },
  {
    userId: "T004",
    name: "Michael R.",
    firstName: "Michael",
    lastName: "R.",
    role: "TASKER",
    category: "Carpenter",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: false,
    lastMessageTime: "3d ago",
    unreadCount: 0,
  },
];

export const clients = [
  {
    userId: "C001",
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    role: "CLIENT",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: true,
    lastMessageTime: "5min ago",
    unreadCount: 2,
  },
];

export const chats = [
  {
    chatId: "123456",
    participants: {
      client: {
        userId: "C001",
        name: "John Doe",
        role: "CLIENT",
      },
      tasker: {
        userId: "T001",
        name: "Michael Smith",
        role: "TASKER",
        skills: ["Plumbing", "Electrical", "Gardening"],
      },
    },
    messages: [
      {
        messageId: "M001",
        senderId: "C001",
        receiverId: "T001",
        timestamp: "2025-02-01T10:00:00Z",
        messageType: "text",
        content:
          "Hi Michael, I need plumbing repair and an electrical checkup at my house. Are you available?",
      },
      {
        messageId: "M002",
        senderId: "T001",
        receiverId: "C001",
        timestamp: "2025-02-01T10:05:00Z",
        messageType: "text",
        content:
          "Hi John! Yes, I can do both plumbing and electrical checkups. What is your preferred date?",
      },
      {
        messageId: "M003",
        senderId: "C001",
        receiverId: "T001",
        timestamp: "2025-02-01T10:07:00Z",
        messageType: "text",
        content: "I would like it done on May 31st. Can you provide an offer?",
      },
      {
        messageId: "M004",
        senderId: "T001",
        receiverId: "C001",
        timestamp: "2025-02-01T10:10:00Z",
        messageType: "offer",
        offer: {
          offerId: "OFFER001",
          taskerId: "T001",
          clientId: "C001",
          task: "Plumbing Repair and Electrical Checkup",
          details:
            "Thanks for reaching out. This is something I can do. I am sending you my offer. If you accept, we can start.",
          date: "2025-05-31",
          price: 150.0,
          status: "pending",
        },
      },
      {
        messageId: "M005",
        senderId: "C001",
        receiverId: "T001",
        timestamp: "2025-02-01T10:15:00Z",
        messageType: "text",
        content: "Thank you! Looking forward to it.",
      },
      {
        messageId: "M006",
        senderId: "C001",
        receiverId: "T001",
        timestamp: "2025-02-01T10:20:00Z",
        messageType: "offerAction",
        offerId: "OFFER001",
        action: "accepted",
      },
      {
        messageId: "M007",
        senderId: "system",
        timestamp: "2025-02-01T10:21:00Z",
        // receiverId: "T001",
        messageType: "order",
        order: {
          orderId: "ORDER001",
          offerId: "OFFER001",
          taskerId: "T001",
          clientId: "C001",
          task: "Plumbing Repair and Electrical Checkup",
          date: "2025-05-31",
          price: 150.0,
          status: "confirmed",
        },
      },
      {
        messageId: "M008",
        senderId: "T001",
        receiverId: "C001",
        timestamp: "2025-02-01T10:25:00Z",
        messageType: "text",
        content: "Your order is confirmed. I will be there on May 31st!",
      },
      {
        messageId: "M009",
        senderId: "C001",
        receiverId: "T001",
        timestamp: "2025-06-01T15:00:00Z",
        messageType: "text",
        content:
          "Thank you for your service! The work was great. I may need some gardening work next week.",
      },
      {
        messageId: "M010",
        senderId: "T001",
        receiverId: "C001",
        timestamp: "2025-06-01T15:10:00Z",
        messageType: "text",
        content:
          "Glad to hear that! Let me know when you're ready, and I can send an offer.",
      },
    ],
  },
  {
    chatId: "234567",
    participants: {
      client: {
        userId: "C002",
        name: "Jane Doe",
        role: "CLIENT",
      },
      tasker: {
        userId: "T002",
        name: "John Doe",
        role: "TASKER",
        skills: ["Electrical", "HVAC", "Plumbing"],
      },
    },
    messages: [
      {
        messageId: "M001",
        senderId: "C002",
        receiverId: "T002",
        timestamp: "2025-02-01T10:00:00Z",
        messageType: "text",
        content:
          "Hi John, I need an electrical system maintenance check. Are you available?",
      },
      {
        messageId: "M002",
        senderId: "T002",
        receiverId: "C002",
        timestamp: "2025-02-01T10:05:00Z",
        messageType: "text",
        content:
          "Hi Jane! Yes, I can do an electrical system maintenance check. What is your preferred date?",
      },
      {
        messageId: "M003",
        senderId: "C002",
        receiverId: "T002",
        timestamp: "2025-02-01T10:07:00Z",
        messageType: "text",
        content: "I would like it done on June 2nd. Can you provide an offer?",
      },
      {
        messageId: "M004",
        senderId: "T002",
        receiverId: "C002",
        timestamp: "2025-02-01T10:10:00Z",
        messageType: "offer",
        offer: {
          offerId: "OFFER002",
          taskerId: "T002",
          clientId: "C002",
          task: "Electrical System Maintenance",
          details:
            "Complete electrical system check and maintenance, including circuit testing and outlet inspection.",
          date: "2025-06-02",
          price: 200.0,
          status: "accepted",
        },
      },
      {
        messageId: "M005",
        senderId: "C002",
        receiverId: "T002",
        timestamp: "2025-02-01T10:15:00Z",
        messageType: "text",
        content: "Thank you! Looking forward to it.",
      },
      {
        messageId: "M006",
        senderId: "C002",
        receiverId: "T002",
        timestamp: "2025-02-01T10:20:00Z",
        messageType: "offerAction",
        offerId: "OFFER002",
        action: "accepted",
      },
      {
        messageId: "M007",
        senderId: "system",
        timestamp: "2025-02-01T10:21:00Z",
        messageType: "order",
        order: {
          orderId: "ORDER002",
          offerId: "OFFER002",
          taskerId: "T002",
          clientId: "C002",
          task: "Electrical System Maintenance",
          date: "2025-06-02",
          price: 200.0,
          status: "confirmed",
        },
      },
      {
        messageId: "M008",
        senderId: "T002",
        receiverId: "C002",
        timestamp: "2025-02-01T10:25:00Z",
        messageType: "text",
        content: "Your order is confirmed. I will be there on June 2nd!",
      },
      {
        messageId: "M009",
        senderId: "C002",
        receiverId: "T002",
        timestamp: "2025-06-03T15:00:00Z",
        messageType: "text",
        content:
          "Thank you for your service! The electrical system is working great now.",
      },
    ],
  },
];

export const plumberImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    alt: "Revision Image 1",
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    alt: "Revision Image 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1608283833336-5fb6f919e5ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBsdW1iaW5nfGVufDB8fDB8fHww",
    alt: "Revision Image 1",
  },
];

export const contactUsData = [
  { _id: "1", type: "Service Provider" },
  { _id: "2", type: "Client" },
];

export const jobs = [
  {
    id: 1,
    jobTitle: "Plumbing Repair and Electrical Checkup",
    location: "Colombo 01",
    jobDate: "2025-02-14",
    jobTime: "10:00 PM",
    jobPostedTime: "Just Now",
    category: "Home Services",
    skill: "Plumbing Repair",
    jobImage:
      "https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    jobTitle: "Plumbing Repair and Electrical Checkup",
    location: "Colombo 02",
    jobDate: "2025-03-01",
    jobTime: "09:30 AM",
    jobPostedTime: "Just Now",
    category: "Home Services",
    skill: "Plumbing Repair",
    jobImage:
      "https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    jobTitle: "Plumbing Repair and Electrical Checkup",
    location: "Colombo 03",
    jobDate: "2025-04-12",
    jobTime: "02:00 PM",
    jobPostedTime: "5 minutes ago",
    category: "Home Services",
    skill: "Plumbing Repair",
    jobImage:
      "https://images.unsplash.com/photo-1608283833336-5fb6f919e5ea?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    jobTitle: "Plumbing Repair and Electrical Checkup",
    location: "Colombo 04",
    jobDate: "2025-05-31",
    jobTime: "01:00 PM",
    jobPostedTime: "1 hour ago",
    category: "Home Services",
    skill: "Plumbing Repair",
    jobImage:
      "https://plus.unsplash.com/premium_photo-1663011218145-c1d0c3ba3542?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    jobTitle: "Plumbing Repair and Electrical Checkup",
    location: "Colombo 05",
    jobDate: "2025-06-10",
    jobTime: "04:45 PM",
    jobPostedTime: "2 hours ago",
    category: "Home Services",
    skill: "Plumbing Repair",
    jobImage:
      "https://plus.unsplash.com/premium_photo-1683141117531-12fb5bb6855f?w=500&auto=format&fit=crop&q=60",
  },
];

export const sampleFeedJobs = [
  {
    id: 1,
    title: "Plumbing Repair and Electrical Checkup",
    image:
      "https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    location: "Colombo 1",
    jobTasks: ["Home Services", "Plumbing Repair"],
    date: "2024-05-31",
    time: "10:00 PM",
  },
  {
    id: 2,
    title: "Plumbing Repair and Electrical Checkup",
    image:
      "https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    location: "Colombo 1",
    jobTasks: ["Home Services", "Plumbing Repair"],
    date: "2024-05-31",
    time: "10:00 PM",
  },
  {
    id: 3,
    title: "Plumbing Repair and Electrical Checkup",
    image:
      "https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    location: "Colombo 1",
    jobTasks: ["Home Services", "Plumbing Repair"],
    date: "2024-05-31",
    time: "10:00 PM",
  },
];

export const newChatFormat = [
  {
    sender: "67a9c3f5e57bc3b49b29e715",
    offer: "67b1fd23da834389438b3d68",
    content: null,
    attachments: [],
    iv: null,
    messageTye: "OFFER",
    _id: "67b1fd23da834389438b3d6a",
    createdAt: "2025-02-16T14:58:43.671Z",
    updatedAt: "2025-02-16T14:58:43.671Z",
  },
  {
    sender: "67a9c3f5e57bc3b49b29e715",
    content:
      "Hi Michael, I need plumbing repair and an electrical checkup at my house. Are you available?",
    attachments: [
      "https://www.stepbystepinspections.net/wp-content/uploads/2024/12/Winter-Plumbing-Problems-and-Prevention-1.png",
      "https://firebasestorage.googleapis.com/v0/b/coursepivot-a7190.firebasestorage.app/o/order%2F1739243402775Antony%20New%20Bugs.docx?alt=media&token=9456ca69-5c83-4f66-92a0-336b0e2d7556",
    ],
    iv: null,
    messageTye: "TEXT",
    _id: "67b1fd58da834389438b3e55",
    createdAt: "2025-02-16T14:59:36.981Z",
    updatedAt: "2025-02-16T14:59:36.981Z",
  },
  {
    sender: "67a9c3f5e57bc3b49b29e714",
    content:
      "Hi John! Yes, I can do both plumbing and electrical checkups. What is your preferred date?",
    attachments: [],
    iv: null,
    messageTye: "TEXT",
    _id: "67b1fd58da834389438b3e56",
    createdAt: "2025-02-16T14:59:36.981Z",
    updatedAt: "2025-02-16T14:59:36.981Z",
  },
  {
    sender: "67a9c3f5e57bc3b49b29e715",
    content: "I would like it done on May 31st. Can you provide an offer?",
    attachments: [],
    iv: null,
    messageTye: "TEXT",
    _id: "67b1fd58da834389438b3e57",
    createdAt: "2025-02-16T14:59:36.981Z",
    updatedAt: "2025-02-16T14:59:36.981Z",
  },
  {
    sender: "67a9c3f5e57bc3b49b29e714",
    content:
      "Thanks for reaching out. This is something I can do. I am sending you my offer. If you accept, we can start.",
    attachments: [],
    iv: null,
    messageTye: "TEXT",
    _id: "67b1fd58da834389438b3e58",
    createdAt: "2025-02-16T14:59:36.981Z",
    updatedAt: "2025-02-16T14:59:36.981Z",
  },
  {
    sender: "67a9c3f5e57bc3b49b29e714",
    content: null,
    attachments: [],
    iv: null,
    messageTye: "OFFER",
    offer: {
      offerId: "67b1fd23da834389438b3d68",
      task: "Plumbing Repair and Electrical Checkup",
      details:
        "Thanks for reaching out. This is something I can do. I am sending you my offer. If you accept, we can start.",
      date: "2025-02-28T14:59:36.981Z",
      time: "10:00 PM",
      price: 150,
      offerStatus: offerStatus.DECLINED,
    },
    _id: "67b1fd58da834389438b3e59",
    createdAt: "2025-02-16T14:59:36.981Z",
    updatedAt: "2025-02-16T14:59:36.981Z",
  },
  {
    sender: "67a9c3f5e57bc3b49b29e714",
    content: null,
    attachments: [],
    iv: null,
    messageTye: "OFFER",
    offer: {
      offerId: "67b1fd23da834389438b3d68",
      task: "Plumbing Repair and Electrical Checkup",
      details:
        "Thanks for reaching out. This is something I can do. I am sending you my offer. If you accept, we can start.",
      date: "2025-02-28T14:59:36.981Z",
      time: "10:00 PM",
      price: 150,
      offerStatus: offerStatus.PENDING,
    },
    _id: "67b1fd58da834389438b3e59",
    createdAt: "2025-02-16T14:59:36.981Z",
    updatedAt: "2025-02-16T14:59:36.981Z",
  },
];

export const chatUsers = [
  {
    userId: "67a9c3f5e57bc3b49b29e715",
    name: "Michael Smith",
    firstName: "Michael",
    lastName: "Smith",
    role: "TASKER",
    category: "Plumber",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    isOnline: true,
    isTyping: true,
    lastMessageTime: "5min ago",
    unreadCount: 2,
  },
];

// kidsplan Project Data
export const mockEvents = [
  {
    id: 1,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    isRecurring: false,
    isSubscription: false,
    date: "2025-05-16T10:00:00Z",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 2,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    isRecurring: false,
    isSubscription: true,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
  {
    id: 3,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 4,
    title: "Magic Show",
    eventType: EVENT_TYPES.RECURRING,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 5,
    title: "Magic Show",
    eventType: EVENT_TYPES.PRIVATE,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 6,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
  {
    id: 7,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 8,
    title: "Magic Show",
    eventType: EVENT_TYPES.RECURRING,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 9,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 10,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
  {
    id: 11,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 12,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
  {
    id: 13,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 14,
    title: "Magic Show",
    eventType: EVENT_TYPES.RECURRING,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 15,
    title: "Magic Show",
    eventType: EVENT_TYPES.PRIVATE,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 16,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
  {
    id: 17,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 18,
    title: "Magic Show",
    eventType: EVENT_TYPES.RECURRING,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 19,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 20,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
  {
    id: 21,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 22,
    title: "Magic Show",
    eventType: EVENT_TYPES.RECURRING,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 23,
    title: "Magic Show",
    eventType: EVENT_TYPES.OPEN,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",
  },
  {
    id: 24,
    title: "Magic Show",
    eventType: EVENT_TYPES.PUBLIC,
    date: "2025-Sep-14",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "Kurunagala",
    price: "$1,170",
    host: "Centigradez",
    image:"../assets/images/image.png",  
  },
];