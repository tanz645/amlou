export interface FieldDefinition {
  id: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'range' | 'date';
  options?: string[];
}

export interface AuditTypeDefinition {
  id: string;
  name: string;
  sections?: {
    name: string;
    fields: FieldDefinition[];
  }[];
  fields?: FieldDefinition[]; // Generic fields if no sections
}

export const AUDIT_FIELD_DEFINITIONS: Record<string, AuditTypeDefinition> = {
  comprehensive: {
    id: 'comprehensive',
    name: 'Comprehensive Audit',
    sections: [
      {
        name: 'Branding Audit',
        fields: [
          { id: 'logoUsageGuidelines', label: 'Logo Usage Guidelines', type: 'checkbox' },
          { id: 'colorPaletteDocumentation', label: 'Color Palette Documentation', type: 'checkbox' },
          { id: 'typographyGuidelines', label: 'Typography Guidelines', type: 'checkbox' },
          { id: 'brandVoiceMessaging', label: 'Brand Voice & Messaging', type: 'checkbox' },
          { id: 'internalBranding', label: 'Internal Branding', type: 'textarea' },
          { id: 'externalBranding', label: 'External Branding', type: 'textarea' },
          { id: 'brandConsistencyObservations', label: 'Brand Consistency Observations', type: 'textarea' },
          { id: 'brandStrengthScore', label: 'Brand Strength Score (1-10)', type: 'range' },
          { id: 'priorityAreasImprovement', label: 'Priority Areas for Improvement', type: 'textarea' },
          { id: 'keyRecommendations', label: 'Key Recommendations', type: 'textarea' },
        ],
      },
      {
        name: 'Communication Channels',
        fields: [
          { id: 'websiteUrl', label: 'Website URL', type: 'text' },
          { id: 'websitePerformance', label: 'Website Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'websiteObservations', label: 'Website Observations', type: 'textarea' },
          { id: 'blogUrl', label: 'Blog URL', type: 'text' },
          { id: 'blogPerformance', label: 'Blog Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'blogObservations', label: 'Blog Observations', type: 'textarea' },
          { id: 'emailFrequency', label: 'Email Frequency', type: 'text' },
          { id: 'emailSubscriberCount', label: 'Email Subscriber Count', type: 'text' },
          { id: 'emailOpenRate', label: 'Email Open Rate %', type: 'text' },
          { id: 'emailObservations', label: 'Email Observations', type: 'textarea' },
        ],
      },
      {
        name: 'Social Media Channels',
        fields: [
          { id: 'facebookFollowers', label: 'Facebook Followers', type: 'text' },
          { id: 'facebookPerformance', label: 'Facebook Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'instagramFollowers', label: 'Instagram Followers', type: 'text' },
          { id: 'instagramPerformance', label: 'Instagram Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'linkedinFollowers', label: 'LinkedIn Followers', type: 'text' },
          { id: 'linkedinPerformance', label: 'LinkedIn Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'twitterFollowers', label: 'Twitter Followers', type: 'text' },
          { id: 'twitterPerformance', label: 'Twitter Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'tiktokFollowers', label: 'TikTok Followers', type: 'text' },
          { id: 'tiktokPerformance', label: 'TikTok Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'youtubeSubscribers', label: 'YouTube Subscribers', type: 'text' },
          { id: 'youtubePerformance', label: 'YouTube Performance', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'socialMediaStrategyAssessment', label: 'Social Media Strategy Assessment', type: 'textarea' },
        ],
      },
      {
        name: 'Paid Channels',
        fields: [
          { id: 'googleAdsBudget', label: 'Google Ads Monthly Budget', type: 'text' },
          { id: 'googleAdsCTR', label: 'Google Ads CTR %', type: 'text' },
          { id: 'googleAdsConversionRate', label: 'Google Ads Conversion Rate %', type: 'text' },
          { id: 'googleAdsObservations', label: 'Google Ads Observations', type: 'textarea' },
          { id: 'facebookAdsBudget', label: 'Meta Ads Monthly Budget', type: 'text' },
          { id: 'facebookAdsCPC', label: 'Meta Ads CPC', type: 'text' },
          { id: 'facebookAdsROAS', label: 'Meta Ads ROAS', type: 'text' },
          { id: 'facebookAdsObservations', label: 'Meta Ads Observations', type: 'textarea' },
          { id: 'otherPaidChannels', label: 'Other Paid Channels', type: 'textarea' },
        ],
      },
      {
        name: 'Earned Channels',
        fields: [
          { id: 'prMediaCoverage', label: 'PR & Media Coverage', type: 'textarea' },
          { id: 'influencerPartnerships', label: 'Influencer Partnerships', type: 'textarea' },
        ],
      },
    ],
  },
  seo: {
    id: 'seo',
    name: 'SEO Audit',
    sections: [
      {
        name: 'Technical SEO',
        fields: [
          { id: 'websiteUrl', label: 'Website URL', type: 'text' },
          { id: 'mobileResponsiveness', label: 'Mobile Responsiveness', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'sslCertificate', label: 'SSL Certificate', type: 'select', options: ['Active', 'Expired', 'Missing'] },
        ],
      },
      {
        name: 'On-Page SEO',
        fields: [
          { id: 'titleTagsOptimization', label: 'Title Tags Optimization', type: 'textarea' },
          { id: 'metaDescriptions', label: 'Meta Descriptions', type: 'textarea' },
          { id: 'headerTags', label: 'Header Tags (H1, H2, H3)', type: 'textarea' },
        ],
      },
      {
        name: 'Content SEO',
        fields: [
          { id: 'keywordResearch', label: 'Keyword Research', type: 'textarea' },
          { id: 'contentOptimization', label: 'Content Optimization', type: 'textarea' },
        ],
      },
      {
        name: 'Recommendations',
        fields: [
          { id: 'technicalImprovements', label: 'Technical Improvements', type: 'textarea' },
          { id: 'contentStrategy', label: 'Content Strategy', type: 'textarea' },
        ],
      },
    ],
  },
  ppc: {
    id: 'ppc',
    name: 'PPC Audit',
    sections: [
      {
        name: 'Account Structure & Settings',
        fields: [
          { id: 'accountName', label: 'Account Name', type: 'text' },
          { id: 'platform', label: 'Platform', type: 'select', options: ['Google Ads', 'Microsoft (Bing) Ads', 'Meta Ads', 'LinkedIn Ads', 'Twitter Ads'] },
          { id: 'campaignStructure', label: 'Campaign Structure Type', type: 'select', options: ['Alpha/Beta', 'Hagakure', 'SKAGs', 'Hybrid', 'Other'] },
          { id: 'biddingStrategies', label: 'Bidding Strategies Used', type: 'text' },
          { id: 'budgetManagement', label: 'Budget Management Style', type: 'select', options: ['Aggressive', 'Balanced', 'Conservative'] },
        ],
      },
      {
        name: 'Keywords & Targeting',
        fields: [
          { id: 'matchTypeDistribution', label: 'Match Type Distribution', type: 'text' },
          { id: 'negativeKeywordsQuality', label: 'Negative Keyword List Quality', type: 'select', options: ['Excellent', 'Good', 'Needs Work', 'Missing'] },
          { id: 'searchTermsReview', label: 'Search Terms Review Frequency', type: 'text' },
          { id: 'audienceTargeting', label: 'Audience Targeting Used', type: 'textarea' },
          { id: 'locationTargeting', label: 'Location Targeting Accuracy', type: 'select', options: ['Accurate', 'Loose', 'Incorrect'] },
        ],
      },
      {
        name: 'Ad Creatives & Messaging',
        fields: [
          { id: 'avgAdStrength', label: 'Average Ad Strength', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { id: 'valuePropClarity', label: 'Value Proposition Clarity', type: 'select', options: ['Clear', 'Somewhat Clear', 'Vague'] },
          { id: 'ctaEffectiveness', label: 'CTA Effectiveness', type: 'text' },
          { id: 'adExtensionUsage', label: 'Ad Extension Usage', type: 'textarea' },
          { id: 'abTesting', label: 'A/B Testing Frequency', type: 'text' },
        ],
      },
      {
        name: 'Tracking & Conversion',
        fields: [
          { id: 'conversionTrackingStatus', label: 'Conversion Tracking Status', type: 'select', options: ['Fully Functional', 'Partial Issues', 'Broken', 'Not Set'] },
          { id: 'gtmIntegration', label: 'GTM Integration', type: 'select', options: ['Yes', 'No'] },
          { id: 'attributionModel', label: 'Attribution Model', type: 'text' },
          { id: 'leadQuality', label: 'Lead/Sale Quality Observation', type: 'textarea' },
        ],
      },
      {
        name: 'Performance Metrics',
        fields: [
          { id: 'avgCtr', label: 'Avg. CTR %', type: 'number' },
          { id: 'avgCpc', label: 'Avg. CPC', type: 'number' },
          { id: 'conversionRate', label: 'Conversion Rate %', type: 'number' },
          { id: 'roasCpa', label: 'ROAS / CPA Performance', type: 'text' },
          { id: 'impressionShareLost', label: 'Impression Share Lost (Budget/Rank)', type: 'text' },
        ],
      },
    ],
  },
  social: {
    id: 'social',
    name: 'Social Media Audit',
    // Special handling for social platform nesting will be needed in UI/PDF
    sections: [
      {
        name: 'General Audit',
        fields: [
          { id: 'totalFollowers', label: 'Total Followers', type: 'number' },
          { id: 'realFollowersPercentage', label: 'Real Followers %', type: 'number' },
          { id: 'primaryAudience', label: 'Primary Target Audience', type: 'text' },
          { id: 'overallEngagementRate', label: 'Average Engagement Rate %', type: 'number' },
          { id: 'brandVoice', label: 'Brand Voice & Tone', type: 'text' },
          { id: 'crossPlatformConsistency', label: 'Cross-Platform Consistency', type: 'select', options: ['highly_consistent', 'somewhat_consistent', 'inconsistent'] },
          { id: 'primaryObjective', label: 'Primary Marketing Objective', type: 'select', options: ['brand_awareness', 'lead_generation', 'community_building', 'sales', 'customer_support'] },
          { id: 'overallContentStrategy', label: 'Overall Content Strategy', type: 'text' },
          { id: 'managementTools', label: 'Management Tools', type: 'text' },
          { id: 'socialSearchAppearance', label: 'Social Search Appearance', type: 'select', options: ['excellent', 'needs_improvement', 'poor'] },
          { id: 'generalObservations', label: 'General Observations', type: 'textarea' },
        ],
      },
      {
        name: 'Facebook Audit',
        fields: [
          { id: 'storefrontCheck', label: 'Digital Storefront Check', type: 'select', options: ['pass', 'fail'] },
          { id: 'brandingConsistency', label: 'Branding Consistency', type: 'select', options: ['consistent', 'inconsistent'] },
          { id: 'coverOptimization', label: 'Cover Photo Optimization', type: 'select', options: ['optimized', 'cutoff'] },
          { id: 'coverMediaType', label: 'Cover Media Type', type: 'select', options: ['video', 'static'] },
          { id: 'actionButton', label: 'Action Button (CTA)', type: 'text' },
          { id: 'pinnedPost', label: 'Pinned Post Status', type: 'text' },
          { id: 'usernameQuality', label: 'Username Quality', type: 'text' },
          { id: 'contactAccuracy', label: 'Contact Accuracy', type: 'select', options: ['verified', 'issues'] },
          { id: 'aboutSection', label: 'About Section (SEO & Value Prop)', type: 'textarea' },
          { id: 'servicesSetup', label: 'Services/Shop Setup', type: 'select', options: ['complete', 'incomplete'] },
          { id: 'transparencyLinks', label: 'Transparency & Linked Accounts', type: 'text' },
          { id: 'contentMix', label: 'Content Mix', type: 'text' },
          { id: 'reelsPercent', label: 'Reels %', type: 'number' },
          { id: 'imagesPercent', label: 'Images/Carousels %', type: 'number' },
          { id: 'visualQuality', label: 'Visual & Video Quality', type: 'select', options: ['high', 'low'] },
          { id: 'hookQuality', label: 'Hook & Caption Quality', type: 'text' },
          { id: 'engagementLoops', label: 'Engagement Loops', type: 'select', options: ['consistent', 'inconsistent'] },
          { id: 'responseTime', label: 'Response Time / Badge', type: 'text' },
          { id: 'commentInteraction', label: 'Comment Interaction', type: 'select', options: ['active', 'ghost'] },
          { id: 'reviewManagement', label: 'Review Management', type: 'textarea' },
          { id: 'automatedMessaging', label: 'Automated Messaging', type: 'text' },
          { id: 'followerVsReach', label: 'Follower vs Reach', type: 'text' },
          { id: 'audienceAlignment', label: 'Audience Alignment', type: 'select', options: ['aligned', 'unaligned'] },
          { id: 'negativeFeedback', label: 'Negative Feedback Spikes', type: 'text' },
          { id: 'peakTimes', label: 'Peak Posting Times', type: 'select', options: ['optimized', 'convenient'] },
          { id: 'pixelStatus', label: 'Pixel & API Status', type: 'text' },
          { id: 'domainVerification', label: 'Domain Verification', type: 'select', options: ['verified', 'unverified'] },
          { id: 'eventTracking', label: 'Event Tracking', type: 'select', options: ['standard', 'pageview'] },
          { id: 'accountHygiene', label: 'Ad Account Hygiene', type: 'textarea' },
          { id: 'adLibrary', label: 'Ad Library Transparency', type: 'text' },
          { id: 'creativeComparison', label: 'Creative Comparison', type: 'textarea' },
          { id: 'offerDifferentiation', label: 'Offer Differentiation', type: 'text' },
          { id: 'retentionRate', label: 'Retention Rate', type: 'text' },
          { id: 'clickFriction', label: 'Click-Through Friction', type: 'select', options: ['seamless', 'high'] },
          { id: 'omnichannelSync', label: 'Omnichannel Sync', type: 'text' },
          { id: 'contentDepth', label: 'Content Library Depth', type: 'select', options: ['ready', 'lacking'] },
          { id: 'scalableEngagement', label: 'Scalability of Engagement', type: 'select', options: ['steady', 'dropping'] },
          { id: 'leadQuality', label: 'Lead Quality', type: 'text' },
        ],
      },
      {
        name: 'Instagram Audit',
        fields: [
          { id: 'profilePicture', label: 'Profile Picture / Avatar', type: 'select', options: ['optimized', 'needs_improvement'] },
          { id: 'nameFieldSeo', label: 'Name Field SEO', type: 'text' },
          { id: 'bioFormatting', label: 'Bio Formatting & Value Prop', type: 'textarea' },
          { id: 'linkInBio', label: 'Link-in-Bio Tool', type: 'select', options: ['optimized', 'single_link', 'missing'] },
          { id: 'highlightsCohesion', label: 'Story Highlights Cohesion', type: 'select', options: ['branded', 'messy', 'missing'] },
          { id: 'visualIdentity', label: 'Visual Identity / Brand Colors', type: 'select', options: ['cohesive', 'inconsistent'] },
          { id: 'firstNineImpression', label: 'First 9 Squares Impression', type: 'text' },
          { id: 'textToImageRatio', label: 'Text-to-Image Ratio', type: 'text' },
          { id: 'reelsPercent', label: 'Reels %', type: 'number' },
          { id: 'carouselsPercent', label: 'Carousels %', type: 'number' },
          { id: 'imagesPercent', label: 'Single Images %', type: 'number' },
          { id: 'carouselDepth', label: 'Carousel Depth & Value', type: 'select', options: ['high', 'low'] },
          { id: 'reelsPacing', label: 'Reels Hook & Pacing', type: 'text' },
          { id: 'storiesStrategy', label: 'Stories Strategy', type: 'select', options: ['active', 'inconsistent', 'absent'] },
          { id: 'commentResponse', label: 'Comment Response Rate', type: 'select', options: ['excellent', 'poor'] },
          { id: 'outboundEngagement', label: 'Proactive Outbound Engagement', type: 'select', options: ['active', 'inactive'] },
          { id: 'dmAutomation', label: 'DM Automation Usage', type: 'text' },
          { id: 'seoKeywords', label: 'SEO Keyword Usage', type: 'text' },
          { id: 'locationTagging', label: 'Location Tagging', type: 'select', options: ['consistent', 'inconsistent'] },
          { id: 'hashtagStrategy', label: 'Hashtag Strategy', type: 'textarea' },
          { id: 'reachVsEngagement', label: 'Reach vs Engagement Ratio', type: 'text' },
          { id: 'growthVelocity', label: 'Follower Growth Velocity', type: 'select', options: ['growing', 'stagnant', 'declining'] },
          { id: 'trafficGeneration', label: 'Conversion / Traffic Generation', type: 'text' },
        ],
      },
      {
        name: 'YouTube Audit',
        fields: [
          { id: 'profileUrl', label: 'Profile URL', type: 'text' },
          { id: 'followerCount', label: 'Follower Count', type: 'number' },
          { id: 'engagementRate', label: 'Average Engagement Rate (%)', type: 'number' },
          { id: 'postFrequency', label: 'Post Frequency (Per Week)', type: 'number' },
        ],
      },
      {
        name: 'TikTok Audit',
        fields: [
          { id: 'profileUrl', label: 'Profile URL', type: 'text' },
          { id: 'followerCount', label: 'Follower Count', type: 'number' },
          { id: 'engagementRate', label: 'Average Engagement Rate (%)', type: 'number' },
          { id: 'postFrequency', label: 'Post Frequency (Per Week)', type: 'number' },
        ],
      },
      {
        name: 'Twitter Audit',
        fields: [
          { id: 'profileUrl', label: 'Profile URL', type: 'text' },
          { id: 'followerCount', label: 'Follower Count', type: 'number' },
          { id: 'engagementRate', label: 'Average Engagement Rate (%)', type: 'number' },
          { id: 'postFrequency', label: 'Post Frequency (Per Week)', type: 'number' },
        ],
      },
      {
        name: 'LinkedIn Audit',
        fields: [
          { id: 'profileUrl', label: 'Profile URL', type: 'text' },
          { id: 'followerCount', label: 'Follower Count', type: 'number' },
          { id: 'engagementRate', label: 'Average Engagement Rate (%)', type: 'number' },
          { id: 'postFrequency', label: 'Post Frequency (Per Week)', type: 'number' },
        ],
      },
    ],
  },
  email: {
    id: 'email',
    name: 'Email Marketing Audit',
    sections: [
      {
        name: 'Provider & Infrastructure',
        fields: [
          { id: 'emailProvider', label: 'Email Service Provider', type: 'text' },
          { id: 'sendingDomain', label: 'Sending Domain', type: 'text' },
          { id: 'dkimStatus', label: 'DKIM Status', type: 'select', options: ['valid', 'invalid', 'not-set'] },
          { id: 'spfStatus', label: 'SPF Status', type: 'select', options: ['valid', 'invalid', 'not-set'] },
          { id: 'dmarcStatus', label: 'DMARC Status', type: 'select', options: ['valid', 'invalid', 'not-set'] },
          { id: 'dedicatedIP', label: 'Dedicated IP', type: 'select', options: ['yes', 'no'] },
          { id: 'sendingReputation', label: 'Sending Reputation', type: 'text' },
        ],
      },
      {
        name: 'List Health',
        fields: [
          { id: 'subscriberCount', label: 'Subscriber Count', type: 'number' },
          { id: 'listGrowthRate', label: 'List Growth Rate %', type: 'number' },
          { id: 'listChurnRate', label: 'List Churn Rate %', type: 'number' },
          { id: 'listSource', label: 'List Source', type: 'text' },
          { id: 'listCleaningFrequency', label: 'List Cleaning Frequency', type: 'text' },
          { id: 'inactiveSubscribers', label: 'Inactive Subscribers %', type: 'number' },
          { id: 'listSegmentation', label: 'List Segmentation', type: 'text' },
        ],
      },
      {
        name: 'Campaign Performance',
        fields: [
          { id: 'totalCampaigns', label: 'Total Campaigns Sent', type: 'number' },
          { id: 'avgOpenRate', label: 'Avg. Open Rate %', type: 'number' },
          { id: 'avgClickRate', label: 'Avg. Click Rate %', type: 'number' },
          { id: 'avgBounceRate', label: 'Avg. Bounce Rate %', type: 'number' },
          { id: 'avgUnsubscribeRate', label: 'Avg. Unsubscribe Rate %', type: 'number' },
          { id: 'avgSpamComplaintRate', label: 'Avg. Spam Complaint Rate %', type: 'number' },
          { id: 'bestPerformingCampaign', label: 'Best Performing Campaign', type: 'textarea' },
          { id: 'worstPerformingCampaign', label: 'Worst Performing Campaign', type: 'textarea' },
          { id: 'campaignFrequency', label: 'Campaign Frequency', type: 'text' },
          { id: 'sendTimeOptimization', label: 'Send Time Optimization', type: 'text' },
        ],
      },
    ],
  },
  website: {
    id: 'website',
    name: 'Website Performance Audit',
    sections: [
      {
        name: 'Basic Info',
        fields: [
          { id: 'websiteUrl', label: 'Website URL', type: 'text' },
          { id: 'hostingProvider', label: 'Hosting Provider', type: 'text' },
          { id: 'cms', label: 'CMS/Platform', type: 'text' },
          { id: 'sslEnabled', label: 'SSL Enabled?', type: 'select', options: ['yes', 'no'] },
        ],
      },
      {
        name: 'Technical Performance',
        fields: [
          { id: 'pageLoadTime', label: 'Page Load Time (s)', type: 'number' },
          { id: 'ttfb', label: 'Time to First Byte (ms)', type: 'number' },
          { id: 'coreWebVitals', label: 'Core Web Vitals', type: 'text' },
          { id: 'uptime', label: 'Uptime %', type: 'number' },
          { id: 'errorRate', label: 'Error Rate %', type: 'number' },
        ],
      },
      {
        name: 'User Experience',
        fields: [
          { id: 'mobileFriendly', label: 'Mobile Friendly?', type: 'select', options: ['yes', 'no'] },
          { id: 'accessibilityScore', label: 'Accessibility Score', type: 'number' },
          { id: 'navigationEase', label: 'Navigation Ease', type: 'text' },
          { id: 'designConsistency', label: 'Design Consistency', type: 'text' },
        ],
      },
    ],
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile App Audit',
    sections: [
      {
        name: 'Basic Info',
        fields: [
          { id: 'appName', label: 'App Name', type: 'text' },
          { id: 'platform', label: 'Platform', type: 'select', options: ['ios', 'android', 'both'] },
          { id: 'appVersion', label: 'App Version', type: 'text' },
          { id: 'bundleId', label: 'Bundle ID', type: 'text' },
        ],
      },
      {
        name: 'Technical Performance',
        fields: [
          { id: 'appSize', label: 'App Size (MB)', type: 'number' },
          { id: 'startupTime', label: 'Startup Time (s)', type: 'number' },
          { id: 'crashRate', label: 'Crash Rate %', type: 'number' },
          { id: 'apiResponseTime', label: 'API Response Time (ms)', type: 'number' },
        ],
      },
    ],
  },
  content: {
    id: 'content',
    name: 'Content Audit',
    sections: [
      {
        name: 'Content Inventory',
        fields: [
          { id: 'totalContentPieces', label: 'Total Content Pieces', type: 'text' },
          { id: 'contentTypesAvailable', label: 'Content Types Available', type: 'textarea' },
          { id: 'contentAgeDistribution', label: 'Content Age Distribution', type: 'textarea' },
        ],
      },
      {
        name: 'Performance Metrics',
        fields: [
          { id: 'averagePageViews', label: 'Average Page Views', type: 'text' },
          { id: 'averageTimeOnPage', label: 'Average Time on Page', type: 'text' },
          { id: 'bounceRate', label: 'Bounce Rate', type: 'text' },
          { id: 'conversionRate', label: 'Conversion Rate', type: 'text' },
        ],
      },
    ],
  },
  internal: {
    id: 'internal',
    name: 'Internal Audit',
    sections: [
      {
        name: 'Team & Structure',
        fields: [
          { id: 'teamSize', label: 'Team Size', type: 'number' },
          { id: 'rolesCovered', label: 'Roles Covered', type: 'text' },
          { id: 'leadership', label: 'Leadership Structure', type: 'text' },
          { id: 'teamDiversity', label: 'Team Diversity', type: 'select', options: ['excellent', 'good', 'average', 'poor'] },
        ],
      },
      {
        name: 'Skills & Training',
        fields: [
          { id: 'skillGaps', label: 'Skill Gaps', type: 'textarea' },
          { id: 'certifications', label: 'Certifications', type: 'text' },
          { id: 'trainingCompletion', label: 'Training Completion %', type: 'number' },
        ],
      },
    ],
  },
  campaigns: {
    id: 'campaigns',
    name: 'Campaigns Audit',
    fields: [
      { id: 'totalCampaigns', label: 'Total Campaigns', type: 'number' },
    ],
  },
};
