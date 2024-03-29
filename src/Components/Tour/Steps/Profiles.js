export const steps = [
  {
    selector: '[tour-id="master-profile"]',
    content: 'Direct link to your master profile. When you create a new profile, the information in this profile is used to pre-populate the different sections of the profile. While you can elevate a sub-profile to replace your master profile, it cannot be deleted while it is your master profile.'
  },
  {
    selector: '[tour-id="sub-profiles"]',
    content: 'List of your sub-profiles. All profiles besides your master profile are displayed here. By default, these are named "New Profile" unless you opt to rename them. Sub-profiles can be deleted via the red delete icon.'
  },
  {
    selector: '[tour-id="search"]',
    content: 'Search tool for filtering profiles by specified criteria. You can search profiles by name or by their contents.'
  },
  {
    selector: '[tour-id="new-profile"]',
    content: 'Button for adding a new sub-profile. Generates a new profile based on the data in your master profile and redirects you to it.'
  }
]