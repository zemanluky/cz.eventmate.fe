import { HStack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import * as React from "react";

interface Member {
  id: string;
  name: string;
  surname: string;
  imageUrl: string;
}

interface AvatarGroupProps {
  members: {
    member: Member;
  }[];
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ members }) => {
  const numberOfMembers = `+${members.length - 2}`;
  console.log(numberOfMembers);

  return (
    <HStack gap="0" position="relative">
      {members.slice(0, 2).map(({ member }, index) => (
        <Avatar
          key={member.id}
          name={`${member.name} ${member.surname}`}
          src={member.imageUrl}
          size="xs"
          style={{ marginLeft: index === 0 ? "0" : "-12px" }}
        />
      ))}
      {members.length > 3 && (
        <Avatar
          displayCount={true}
          name={numberOfMembers}
          size="xs"
          style={{ marginLeft: "-12px" }}
        />
      )}
    </HStack>
  );
};