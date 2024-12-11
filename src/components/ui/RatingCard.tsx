import { HStack, Spacer } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Card } from "@ParkComponents/card";
import { Text } from "@ParkComponents/text";
import { Star } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

interface RatingCardProps {
  rating: {
    user: {
      id: string;
      name: string;
      surname: string;
    };
    ratingNumber: number;
    comment: string;
  };
}

export const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
  return (
    <>
      <Card.Root w="100%">
        <Card.Header>
          <HStack>
            <Link to={`/profile/${rating.user.id}`}>
              <HStack>
                <Avatar name={`${rating.user.name} ${rating.user.surname}`} />
                <Text>
                  {rating.user.name} {rating.user.surname}
                </Text>
              </HStack>
            </Link>
            <Spacer />
            <Text>{rating.ratingNumber}</Text>
            <Star size={10} />
          </HStack>
        </Card.Header>
        <Card.Body>
          <Text>
            <b>Commented: </b>
            {rating.comment}
          </Text>
        </Card.Body>
      </Card.Root>
    </>
  );
};
