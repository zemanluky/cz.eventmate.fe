import { HStack, Spacer } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Card } from "@ParkComponents/card";
import { Spinner } from "@ParkComponents/spinner";
import { Text } from "@ParkComponents/text";
import { Star } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import useGetUserById from "src/hooks/useGetUserById";

interface RatingCardProps {
  rating: {
    author: string;
    starRating: number;
    comment: string;
    _id: string;
    createdAt: string;
  };
}

export const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
  const authorId = rating?.author;
  const { user: author, loading, error } = useGetUserById(authorId);
  return (
    <>
      {loading && error ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Card.Root w="100%">
            <Card.Header>
              <HStack>
                <Link to={`/profile/${author?._id}`}>
                  <HStack>
                    <Avatar
                      name={`${author?.name}` + " " + `${author?.surname}`}
                    />
                    <Text>
                      {author?.name} {author?.surname}
                    </Text>
                  </HStack>
                </Link>
                <Spacer />
                <Text>{rating?.starRating}</Text>
                <Star size={10} />
              </HStack>
            </Card.Header>
            <Card.Body>
              <Text>
                <b>Commented: </b>
                {rating?.comment}
              </Text>
            </Card.Body>
          </Card.Root>
        </>
      )}
    </>
  );
};
