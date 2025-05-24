import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";
import { getUsersDetailsByTypeAndArticleId } from "@/services/userService";

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "upvoters" | "downvoters" | "blockers";
  articleId: string;
}

const UserListModal = ({
  isOpen,
  onClose,
  title,
  type,
  articleId,
}: UserListModalProps) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsersDetailsByTypeAndArticleId(type, articleId);
        setUsers(users.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [type, articleId]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0f1729] border-[#164e63]/30">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold text-[#ecfeff]">
            {title}
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-[#94a3b8] hover:text-[#ecfeff]"
          >
            <X size={16} />
          </Button> */}
        </DialogHeader>

        <ScrollArea className="max-h-96">
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-[#94a3b8]">Loading...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-[#94a3b8]">
                No users found
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1e293b]/30"
                >
        
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#ecfeff]">
                      {user.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UserListModal;
