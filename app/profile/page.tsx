"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  FileText,
  Edit,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  id: string;
  username: string;
  profilePicture: string;
  provider: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  location: string | null;
  latestOrganization: string | null;
  YearOfExperience: string | null;
  AboutMe: string | null;
  Skill: string | null;
  Education: string | null;
  Achievements: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/profileApi");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }
      const data: ProfileData = await response.json();
      setUser(data);
      setEditedUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.message("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to load profile. Please try again.",
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser) return;

    try {
      const response = await fetch("/api/profileApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      const updatedProfile = await response.json();
      setUser(updatedProfile.profile);
      setIsEditing(false);
      toast.message("Success", {
        description: "Profile updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.message("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 md:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">
                  {user.latestOrganization}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      name="phoneNumber"
                      value={editedUser?.phoneNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <span>{user.phoneNumber || "Not provided"}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      name="location"
                      value={editedUser?.location || ""}
                      onChange={handleChange}
                      placeholder="Enter location"
                    />
                  ) : (
                    <span>{user.location || "Not provided"}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      name="latestOrganization"
                      value={editedUser?.latestOrganization || ""}
                      onChange={handleChange}
                      placeholder="Enter latest organization"
                    />
                  ) : (
                    <span>{user.latestOrganization || "Not provided"}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      name="YearOfExperience"
                      value={editedUser?.YearOfExperience || ""}
                      onChange={handleChange}
                      placeholder="Enter years of experience"
                    />
                  ) : (
                    <span>
                      {user.YearOfExperience
                        ? `${user.YearOfExperience} years of experience`
                        : "Not provided"}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    name="AboutMe"
                    value={editedUser?.AboutMe || ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <p>{user.AboutMe || "No information provided"}</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Input
                    name="Skill"
                    value={editedUser?.Skill || ""}
                    onChange={handleChange}
                    placeholder="Enter skills separated by commas"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.Skill?.split(",").map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill.trim()}
                      </Badge>
                    )) || "No skills listed"}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Input
                    name="Education"
                    value={editedUser?.Education || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span>
                      {user.Education || "No education information provided"}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    name="Achievements"
                    value={editedUser?.Achievements || ""}
                    onChange={handleChange}
                    placeholder="Enter achievements separated by new lines"
                  />
                ) : (
                  <ul className="list-disc list-inside space-y-2">
                    {user.Achievements?.split("\n").map(
                      (achievement, index) => <li key={index}>{achievement}</li>
                    ) || <li>No achievements listed</li>}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </main>
    </div>
  );
}
