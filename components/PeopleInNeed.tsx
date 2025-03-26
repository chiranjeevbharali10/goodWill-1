
import React, { useState, useEffect } from 'react';
import { MapPin, User, Award, Heart, Droplet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePoints } from '../contexts/PointsContext';

interface PeopleInNeedProps {
  donorBloodGroup: string;
}

export const PeopleInNeed: React.FC<PeopleInNeedProps> = ({ donorBloodGroup }) => {
  const { toast } = useToast();
  const { addPoints } = usePoints();
  const [donatedTo, setDonatedTo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading state
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  
  // Mock data for people who need blood
  const needsBlood = [
    { 
      id: 1,
      name: 'Rahul Kumar',
      bloodGroup: 'A+',
      quantity: '2 units',
      address: 'AIIMS Hospital, Delhi',
      distance: '3.5 km'
    },
    { 
      id: 2,
      name: 'Priya Singh',
      bloodGroup: 'AB+',
      quantity: '4 units',
      address: 'SH 9, RWF West Colony, Yelahanka New Town',
      distance: '2 km'
    },
    { 
      id: 3,
      name: 'Ajay Sharma',
      bloodGroup: 'O+',
      quantity: '1 unit',
      address: 'Fortis Hospital, Bangalore',
      distance: '5.2 km'
    },
    { 
      id: 4,
      name: 'Sonia Mehta',
      bloodGroup: 'A+',
      quantity: '3 units',
      address: 'Apollo Hospital, Chennai',
      distance: '4.7 km'
    },
  ];

  // Filter only patients with the exact same blood group
  const compatiblePatients = needsBlood.filter(patient => patient.bloodGroup === donorBloodGroup);

  const handleDonate = (id: number) => {
    setDonatedTo(id);
    
    // Add 15 points when donating
    addPoints(15);
    
    // Show toast notification
    toast({
      title: "Congratulations!",
      description: "You've earned 15 points for your donation.",
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 text-center animate-fade-in">
        <div className="relative inline-block mb-6">
          <div className="h-16 w-16 rounded-full border-4 border-blood border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Droplet className="h-8 w-8 text-blood animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-blood">Finding matches...</h2>
        <p className="text-muted-foreground">Looking for people who need {donorBloodGroup} blood</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">People Who Need Blood</h2>
        <p className="text-muted-foreground">
          We found {compatiblePatients.length} people who need your blood type
        </p>
      </div>
      
      {donatedTo !== null ? (
        <div className="text-center py-8 animate-fade-in">
          <div className="h-20 w-20 mx-auto rounded-full bg-blood/10 flex items-center justify-center mb-4">
            <Award className="h-10 w-10 text-blood" />
          </div>
          <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
          <p className="text-lg mb-2">You've earned 15 points for your donation.</p>
          <p className="text-muted-foreground mb-6">
            Thank you for being a lifesaver! Your donation will help someone in need.
          </p>
          <div className="max-w-md mx-auto bg-gradient-to-r from-blood/10 to-blood/5 rounded-lg p-6 shadow-md">
            <h4 className="text-lg font-semibold mb-3">Why Donating Blood Matters</h4>
            <p className="mb-3">A single blood donation can save up to three lives. Every two seconds, someone needs blood.</p>
            <p>Your contribution today helps ensure blood is available when and where it's needed most.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {compatiblePatients.length > 0 ? (
            compatiblePatients.map(patient => (
              <div 
                key={patient.id}
                className="flex flex-col md:flex-row md:items-center p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="w-full md:w-auto flex items-center mb-4 md:mb-0 md:mr-4">
                  <div className="h-12 w-12 rounded-full bg-blood/10 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-blood" />
                  </div>
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-blood/10 text-blood rounded-full">
                        {patient.bloodGroup}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                      Quantity: {patient.quantity}
                    </span>
                    <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {patient.distance}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{patient.address}</p>
                  <button 
                    onClick={() => handleDonate(patient.id)}
                    className="px-4 py-2 bg-blood text-white font-medium rounded-lg shadow-sm hover:bg-blood-dark transition-colors button-effect flex items-center gap-1"
                  >
                    <Heart className="h-4 w-4" /> Donate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 bg-blood/5 rounded-lg">
              <div className="h-16 w-16 mx-auto rounded-full bg-blood/10 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-blood" />
              </div>
              <h3 className="text-xl font-medium mb-2">No matches found</h3>
              <p className="text-muted-foreground">
                We couldn't find anyone who needs your exact blood type right now. 
                But your willingness to donate is valued - please check back later!
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-6 bg-gradient-to-br from-blood/5 to-white rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-center">Blood Donation Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-medium text-blood">Every 2 seconds</p>
            <p className="text-sm">Someone in the world needs blood</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-medium text-blood">1 donation</p>
            <p className="text-sm">Can save up to 3 lives</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-medium text-blood">Blood cannot be manufactured</p>
            <p className="text-sm">It can only come from generous donors</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-medium text-blood">Only 37%</p>
            <p className="text-sm">Of the population is eligible to donate blood</p>
          </div>
        </div>
      </div>
    </div>
  );
};
