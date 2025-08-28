import { Avatar, Card } from "flowbite-react";
import { formatDate } from "../../lib/formateDate";

export default function PostHeader({ user, isComment = false }) {
  const { name, photo, createdAt, body } = user;

  const content = (
    <>
      <header className="flex items-center">
        <picture>
          <Avatar
            img={
              !photo.includes("undefined")
                ? photo
                : `${import.meta.env.VITE_BASE_URL}/uploads/default-profile.png`
            }
            alt="profile-person"
            className="me-4"
            rounded
          />
        </picture>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h2>
          <span>{formatDate(createdAt)}</span>
        </div>
      </header>
      <p
        className={`font-normal text-gray-700 dark:text-gray-200 truncate ${
          isComment ? "ps-16" : ""
        }`}
      >
        {body}
      </p>
    </>
  );

  return isComment ? <Card>{content}</Card> : content;
}
