import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const occasionTypes = [
  { id: "weddings", name: "Weddings" },
  { id: "social-events", name: "Social Events" },
  { id: "meetings", name: "Meetings & Conferences" },
  { id: "event-spaces", name: "Event Spaces" },
];

export default function InquiryPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Event Inquiry</CardTitle>
          <CardDescription>
            Fill out this form and our events team will get back to you within 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select defaultValue={searchParams.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasionTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Preferred Event Date</Label>
                <Input id="eventDate" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestCount">Expected Guest Count</Label>
                <Input id="guestCount" type="number" min="1" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5000">Under $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                    <SelectItem value="20000-plus">$20,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your event and any specific requirements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Inquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 