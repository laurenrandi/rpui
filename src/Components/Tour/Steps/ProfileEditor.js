export const steps = [
  {
    selector: '[tour-id="back"]',
    content: 'Return to profile list'
  },
  {
    selector: '[tour-id="name"]',
    content: 'Profile name. By default, sub-profiles are named "New Profile" though this can be changed. Your master profile will always be named "Master Profile" for clarity.'
  },
  {
    selector: '[tour-id="rename"]',
    content: 'Rename the profile. Unavailable for your master profile.'
  },
  {
    selector: '[tour-id="elevate"]',
    content: 'Elevate the current profile to replace your master profile. This change will be applied upon saving, and your master profile will be added to your sub-profiles with the name "Old Master Profile".'
  },
  {
    selector: '[tour-id="revert"]',
    content: 'Revert all unsaved changes. This cannot be undone.'
  },
  {
    selector: '[tour-id="save"]',
    content: 'Save any changes made to your profile.'
  },
  {
    selector: '[tour-id="pdf"]',
    content: 'Export all saved info into a formatted & styled PDF.'
  },
  {
    selector: '[tour-id="contact"]',
    content: 'Contact info section. Here, you can add details such as your name, email, and phone number specific to this profile via the edit button.'
  },
  {
    selector: '[tour-id="education"]',
    content: 'Education section. Here, you can list your past & current institutions. Each entry requires at least a school name, start date, and a degree type.'
  },
  {
    selector: '[tour-id="about"]',
    content: 'About section. Here, you can add a brief biography about yourself and your personal/professional interests. You can also input this info in a bulleted list.'
  },
  {
    selector: '[tour-id="workhistory"]',
    content: 'Work history/jobs section. Here, you can add your past & present work experience. Each entry requires at least a company, role/title, and a start date.'
  },
  {
    selector: '[tour-id="projects"]',
    content: 'Projects section. Here, you can add your past & present projects and any relevant links. Each entry requires at least a name, type, and start date.'
  },
  {
    selector: '[tour-id="skills"]',
    content: 'Skills section. Here, you can add your relevant skills as well as a rating & duration for each one. Each entry requires a type, name, and months of experience.'
  },
]