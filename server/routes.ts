import express, { Router } from 'express';
import book from './routes/book.ts';
import mybook from './routes/mybook.ts';
import userbook from './routes/userbook.ts';
import roles from './routes/roles.ts';
import user from './routes/user.ts';

const router: Router = express.Router();

router.use("/book", book);
router.use("/my-book", mybook);
router.use("/user-book", userbook);
router.use("/roles", roles);
router.use("/user", user);

export default router;

