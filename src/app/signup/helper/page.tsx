'use client';

import Link from "next/link";

export default function HelperSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign up has been removed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create accounts have been disabled. Please contact the maintainers if you need access.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
        </div>
      </div>
    </div>
  );
}


export default function HelperSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign up has been removed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create accounts have been disabled. Please contact the maintainers if you need access.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
        </div>
      </div>
    </div>
  );
}


  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    onSubmit,
    formState: { errors },
  } = useForm<HelperSignupFormData>({
    resolver: zodResolver(helperSignupSchema),
  });

  const onSubmit = async () => {};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign up has been removed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create accounts have been disabled. Please contact the maintainers if you need access.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
        </div>
      </div>
    </div>


                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Join as a Helper</h1>
                  <p className="text-gray-600">Turn your skills into income</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Why helpers choose AnyHelper:</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Earn $25-75/hour</h3>
                    <p className="text-gray-600">Set your own rates and keep 85% of what you earn</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Schedule</h3>
                    <p className="text-gray-600">Work when you want, choose your own hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Grow Your Business</h3>
                    <p className="text-gray-600">Build your reputation and get repeat customers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Average Helper Earnings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$1,200</div>
                  <div className="text-sm text-gray-600">Per week (part-time)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$3,500</div>
                  <div className="text-sm text-gray-600">Per week (full-time)</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">🎉 Launch Bonus</h3>
              <p className="text-gray-700">Complete your first 5 jobs and earn a $100 bonus!</p>
            </div>
          </div>



                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm your password"
                      
                      disabled={isLoading}
                      className="border-gray-300 focus:border-orange-500"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Start Earning as Helper"}
                  </Button>

                  <div className="text-center space-y-2 pt-4">
                    <p className="text-sm text-gray-600">
                      Need services instead?{" "}
                      <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                        Return home
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}