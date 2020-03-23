interface User {
   // Generated id from mongo
   _id?: any;
   email: string;
   passwordHash: string;
   hashVersion: 1;
   metadata: Record<string, any>;
}
