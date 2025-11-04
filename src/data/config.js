import { 
  Home, Users, Package, Mail, 
  Locate, Phone, Clock, 
  Sprout, Truck, Globe, Award, 
  Sun, CheckCircle, Factory, TrendingUp,
  Leaf, ShieldCheck
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: 'home', Icon: Home },
  { name: 'About Us', path: 'about', Icon: Users },
  { name: 'Products', path: 'products', Icon: Package },
  { name: 'Contact Us', path: 'contact', Icon: Mail },
];

export const POTATO_VARIETIES = [
  { 
    name: 'Kufri Jyoti', use: 'Table/Fries', origin: 'Farrukhabad', 
    description: 'Early-maturing, creamy texture, ideal for light fries and daily use.', 
    moisture: 'Medium', 
    img: 'https://media.potatopro.com/kufri-jyoti-1200x743.jpg'
  },
  { 
    name: 'Chipsona', use: 'Chips/Wafers', origin: 'India', 
    description: 'Low sugar, golden crisp chips, long shelf life. Industry favorite.', 
    moisture: 'Low (High Dry Matter)',
    img: 'https://5.imimg.com/data5/SELLER/Default/2022/9/RE/XN/XA/124447781/chipsona-potato-sugar-free.jpg',
    popular: true
  },
  { 
    name: 'Pukharaj', use: 'Table/Processing', origin: 'Farrukhabad', 
    description: 'High-yield, versatile, perfect for bulk export and processing.', 
    moisture: 'Medium-High',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0pTBURWj_BYIlo5I4eG0joZ6eHBXwFRvczw&s'
  },
  { 
    name: 'Kufri Khyati', use: 'Table/New Potato', origin: 'Northern Plains', 
    description: 'Extra-early, uniform round tubers. Best as fresh "new potatoes."', 
    moisture: 'High',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-H0IGpza5-Ccw_fwcrCarfeSBC77lfxGATA&s'
  },
  { 
    name: 'Lady Rosetta', use: 'Chips/Crisps', origin: 'Europe/India', 
    description: 'Premium crisp variety. Uniform size, high starch, golden color.', 
    moisture: 'Low',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsdyTGLgUit5XIlrVYf9ki9JMU03301sqJGQ&s',
    popular: true
  },
  { 
    name: 'Santana', use: 'Fries/Export', origin: 'Netherlands/India', 
    description: 'Long oval, ideal for frozen fries. High yield, excellent storage.', 
    moisture: 'Medium',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdZ9hRchDfy1cpkilCshDi8J_0t9fKmb5GQ&s'
  },
  { 
    name: 'Atlantic', use: 'Chips/Processing', origin: 'USA/India', 
    description: 'World standard for chips. High dry matter, minimal discoloration.', 
    moisture: 'Low',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRa6fndURa9GsVAfFrxvL6tT2wx3kj8nTr8g&s'
  },
];

export const CONTACT_INFO = {
  phone: '+91 8299789304',
  email: 'export@hritiktraders.com',
  address: 'Plot 42, Export Yard, Farrukhabad, Uttar Pradesh, India - 209625',
  hours: 'Mon - Sat: 9:00 AM - 6:00 PM (IST)',
};