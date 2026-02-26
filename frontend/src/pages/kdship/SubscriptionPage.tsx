import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function SubscriptionPage() {
  const tiers = [
    {
      name: 'Free',
      price: '₹0',
      features: ['Limited topic access', '1 mock test', 'No certificates'],
      current: true,
    },
    {
      name: 'Basic',
      price: '₹99',
      features: ['Full subject access', 'All topic quizzes', '3 mock tests'],
      current: false,
    },
    {
      name: 'Premium',
      price: '₹199',
      features: [
        'Unlimited mock tests',
        'Detailed analytics',
        'Rank prediction',
        'Certificates',
        'DNS + STCW access',
      ],
      current: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">Subscription Plans</h1>
          <p className="text-kdship-text-muted">Choose the plan that fits your learning needs</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`border-kdship-border bg-kdship-navy-light ${tier.name === 'Basic' ? 'ring-2 ring-kdship-teal' : ''}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                  {tier.current && (
                    <Badge className="bg-kdship-teal text-kdship-navy">Current</Badge>
                  )}
                </div>
                <CardDescription className="text-kdship-text-muted">
                  {tier.name === 'Free' && 'Get started with basics'}
                  {tier.name === 'Basic' && 'Most popular choice'}
                  {tier.name === 'Premium' && 'Complete access'}
                </CardDescription>
                <div className="mt-4 text-4xl font-bold text-kdship-teal">{tier.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-kdship-text-muted">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-kdship-teal" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-kdship-border bg-kdship-navy-light">
          <CardHeader>
            <CardTitle className="text-white">Payment Integration</CardTitle>
            <CardDescription className="text-kdship-text-muted">
              Payment processing will be available in Phase 2. For now, upgrades are managed manually by administrators.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
