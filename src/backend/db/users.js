import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

//When Click on Follow That Followed User will be added in following named field(get created on the first follow reuqest)
//and in the followed user data follower's field will have our record.
export const users = [
  {
    _id: "t7cZfWIp-q",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Be yourself!",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/kfm34agwhxwankiga6h2",
    website: "https://adarshbalika.netlify.app/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "79Gksh9otl",
    firstName: "stefan",
    lastName: "salvatore",
    username: "stefan",
    password: "stefan123",
    bio: "Hello World",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/g69v9gj56wmkww9sliit",
    website: "https://stefan.com/",
    createdAt: "2022-01-02T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "1T6Be1QpLm",
    firstName: "damon",
    lastName: "salvatore",
    username: "damon",
    password: "damon123",
    bio: "Whats in bio?",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/v1687604085/porfilepics/s5kq1so4nsdhdzzvpviv.jpg",
    website: "https://damon.com/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "LCrc9f0Zl0",
    firstName: "Klaus",
    lastName: "MikelSon",
    username: "klaus",
    password: "klaus123",
    bio: "Whats in bio?",
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/yckmbk0ah8gmzz04xueg",
    website: "https://klaus.com/",
    createdAt: "2022-01-03T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "o5gzWjEeX_",
    firstName: "elijah",
    lastName: "Mikaleson",
    username: "elijah",
    password: "elijah123",
    bio: "Aspiring Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/jnl4si9uk4ipxhyif7ga",
    website: "https://elijah.com/",
    createdAt: "2022-01-04T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "M1NR81Bzlz",
    firstName: "kol",
    lastName: "Mikaleson",
    username: "kol",
    password: "kol123",
    bio: "What's up?",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/udj1yzwfj4vtvsni1kcv",
    website: "",
    createdAt: "2022-01-05T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "qq8zWjEeXd",
    firstName: "fin",
    lastName: "Mikaleson",
    username: "fin",
    password: "fin123",
    bio: "Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/gbgam9gjsyj6iuz6yxy3",
    website: "",
    createdAt: "2022-01-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "qq8zWjEesl",
    firstName: "alaric",
    lastName: "saltzman",
    username: "alaric",
    password: "alaric123",
    bio: "Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/shazeb/image/upload/f_auto,q_auto/v1/porfilepics/gcmddwechrycunftotgl",
    website: "",
    createdAt: "2022-01-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
];
