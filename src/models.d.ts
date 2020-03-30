interface User {
   // Generated id from mongo
   _id?: any;
   email: string;
   passwordHash: string;
   salt: string;
   hashVersion: 1;
   metadata: Record<string, any>;
}
