
import React, { useState } from 'react';
import { ArrowLeft, Upload, Check, Globe, MapPin, User, FileText, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

const VerhaalDelen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    naam: '',
    land: '',
    stad: '',
    titel: '',
    verhaal: '',
    media: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, media: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center shadow-lg">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bedankt!</h2>
            <p className="text-gray-600 mb-6">
              Je verhaal wordt beoordeeld door de redactie en verschijnt binnenkort op Yaro.
            </p>
            <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
              Terug naar Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Deel jouw verhaal op Yaro</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Stap {currentStep} van {totalSteps}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-orange-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">
                {currentStep === 1 && "Vertel ons over jezelf"}
                {currentStep === 2 && "Waar gaat je verhaal over?"}
                {currentStep === 3 && "Deel je verhaal"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="naam" className="text-base font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Jouw naam
                    </Label>
                    <Input
                      id="naam"
                      value={formData.naam}
                      onChange={(e) => handleInputChange('naam', e.target.value)}
                      placeholder="Bijv. Maria"
                      className="text-base p-3 border-orange-200 focus:border-orange-400"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="land" className="text-base font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Land
                      </Label>
                      <Input
                        id="land"
                        value={formData.land}
                        onChange={(e) => handleInputChange('land', e.target.value)}
                        placeholder="Bijv. Nederland"
                        className="text-base p-3 border-orange-200 focus:border-orange-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stad" className="text-base font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Stad/Dorp
                      </Label>
                      <Input
                        id="stad"
                        value={formData.stad}
                        onChange={(e) => handleInputChange('stad', e.target.value)}
                        placeholder="Bijv. Amsterdam"
                        className="text-base p-3 border-orange-200 focus:border-orange-400"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Story Title */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="titel" className="text-base font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Titel van je verhaal
                    </Label>
                    <Input
                      id="titel"
                      value={formData.titel}
                      onChange={(e) => handleInputChange('titel', e.target.value)}
                      placeholder="Bijv. De mooiste plekjes in mijn stad"
                      className="text-base p-3 border-orange-200 focus:border-orange-400"
                      required
                    />
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">💡 Tips voor een goede titel:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Maak het persoonlijk en specifiek</li>
                      <li>• Vertel wat reizigers kunnen verwachten</li>
                      <li>• Denk aan: "Verborgen parels", "Lokale geheimen", "Do's en don'ts"</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 3: Story Content */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="verhaal" className="text-base font-medium">
                      Jouw verhaal, tips of advies
                    </Label>
                    <Textarea
                      id="verhaal"
                      value={formData.verhaal}
                      onChange={(e) => handleInputChange('verhaal', e.target.value)}
                      placeholder="Deel je lokale kennis, verborgen parels, culturele tips, do's & don'ts, of budget-vriendelijke aanbevelingen..."
                      className="min-h-32 text-base p-3 border-orange-200 focus:border-orange-400 resize-none"
                      required
                    />
                    <div className="text-sm text-gray-500 text-right">
                      {formData.verhaal.length}/500 karakters
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Media toevoegen (optioneel)
                    </Label>
                    <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                      <input
                        type="file"
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <label htmlFor="media-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-gray-600">
                          Klik om een foto, video of audiofragment toe te voegen
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Ondersteunde formaten: JPG, PNG, MP4, MP3
                        </p>
                      </label>
                      {formData.media && (
                        <p className="text-orange-600 mt-2 font-medium">
                          ✓ Bestand geselecteerd: {formData.media.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="border-orange-200"
                >
                  Vorige
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={
                      (currentStep === 1 && (!formData.naam || !formData.land || !formData.stad)) ||
                      (currentStep === 2 && !formData.titel)
                    }
                  >
                    Volgende
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={!formData.verhaal}
                  >
                    Verstuur naar redactie
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default VerhaalDelen;
