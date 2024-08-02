#import "AppDelegate.h"

#import <Firebase.h>
//#import <FirebaseCore.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "Orientation.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //FirebaseConfig
  [FIRApp configure];
  self.moduleName = @"digicred-wallet";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

//   //FirebaseConfig


// [UNUserNotificationCenter currentNotificationCenter].delegate = self;
// UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
//     UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
// [[UNUserNotificationCenter currentNotificationCenter]
//     requestAuthorizationWithOptions:authOptions
//     completionHandler:^(BOOL granted, NSError * _Nullable error) {
//       // ...
//     }];

// [application registerForRemoteNotifications];


  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end