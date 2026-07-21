 
 export interface Product {
  id: number;
  Name: string;
  Images: string[];
  ImageAlt: string;
  Price: number;
  Colors: string[];
  Description: string;
}
 
 const products:Product[] =
 [
   {
     id: 1,
     Name: 'Air Pods',    
     Images: ['src/assets/3.jfif',"src/assets/311.jfif"],
     ImageAlt: "Front of men's Basic Tee in black.",
     Price: 25,
     Colors:["white","black"],
     Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
   },
   {
       id: 2,
       Name: 'Head Phones',
       Images: ["src/assets/211.jfif","src/assets/212.jfif","src/assets/213.jfif"],
       ImageAlt: "Front of men's Basic Tee in black.",
       Price: 55,
       Colors:["black","white","red"],
       Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },
     {
       id: 3,
       Name: 'Apple Watch',
       Images: ["src/assets/شوفو وش شترولي❤️.jfif","src/assets/111.jfif"],
       ImageAlt: "Front of men's Basic Tee in black.",
       Price: 700,
       Colors:["white","#d6ac6c"],
       Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },  
     {
      
       id: 4,
       Name: 'Hik Vision',
       Images: ['src/assets/239887117644111066.jfif'],
       ImageAlt: "Front of men's Basic Tee in black.",
       Price: 1350,
       Colors:[],
       Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },
     {
        id: 5,
        Name: 'Rolex',
        Images: ['src/assets/12666442696243758.jfif'],
        ImageAlt: "Front of men's Basic Tee in black.",
        Price: 6700,
        Colors:[],
        Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
      },
      {
          id: 6,
          Name: 'Puri fier',
          Images: ["src/assets/Cosmetic lotion cream jar container mockup.jfif"],
          ImageAlt: "Front of men's Basic Tee in black.",
          Price: 20,
          Colors:[],
          Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },
        {
          id: 7,
          Name: 'Atop Ring',
          Images:[ "src/assets/13299761394220174.jfif"],
          ImageAlt: "Front of men's Basic Tee in black.",
          Price: 300,
          Colors:[],
          Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },  
        {
          id: 8,
          Name: 'iphone',
          Images: ["src/assets/1111111.jfif",'src/assets/422564377559090130.jfif',"src/assets/33333.jfif"],
          ImageAlt: "Front of men's Basic Tee in black.",
          Price: 1100,
          Colors:["black","white",],
          Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },
     
 ]
 export default products;