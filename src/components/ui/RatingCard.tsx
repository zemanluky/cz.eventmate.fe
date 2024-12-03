import { HStack, Spacer } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Card } from "@ParkComponents/card";
import { Text } from "@ParkComponents/text";
import { Star } from "lucide-react";
import * as React from "react";

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
            <Avatar name={`${rating.user.name} ${rating.user.surname}`} />
            <Text>
              {rating.user.name} {rating.user.surname}
            </Text>
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
