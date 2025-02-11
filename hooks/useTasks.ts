import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import { delay } from '@/utils/helpers';

const getTasks = async (type: string, pageParam: any, id: string) => {
  await delay(1000);
  let data = {
    "success": true,
    "message": "success enquiries",
    "data": {
      "current_page": 1,
      "data": [
        {
            "id": 420,
            "type": "high",
            "details": "Set up a meal prep plan for the week.",
            "created_at": "2025-01-18T11:00:00.000000Z",
            "updated_at": "2025-01-18T13:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": [
                {
                    "id": 10,
                    "comment": "A Meal prep plan can save time and reduce stress.",
                    "created_at": "2025-01-18T13:30:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 419,
            "type": "backlog",
            "details": "Update the monthly budget spreadsheet.",
            "created_at": "2025-01-15T10:00:00.000000Z",
            "updated_at": "2025-01-15T14:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 418,
            "type": "low",
            "details": "Declutter one drawer or shelf in the house.",
            "created_at": "2025-01-10T12:00:00.000000Z",
            "updated_at": "2025-01-10T15:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 417,
            "type": "high",
            "details": "Plan a weekend outing to recharge mentally.",
            "created_at": "2025-01-05T09:30:00.000000Z",
            "updated_at": "2025-01-06T18:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": [
                {
                    "id": 7,
                    "comment": "Plan a weekend outing to recharge mentally by immersing yourself in nature or exploring a new activity—this helps clear the mind, refresh your perspective, and reduce stress. Taking a break from routine fosters creativity and emotional balance.",
                    "created_at": "2025-01-06T18:30:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 416,
            "type": "backlog",
            "details": "Sort through emails and archive old ones.",
            "created_at": "2024-12-10T10:00:00.000000Z",
            "updated_at": "2024-12-12T16:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 415,
            "type": "low",
            "details": "Write down three daily goals in a notebook.",
            "created_at": "2024-12-05T08:30:00.000000Z",
            "updated_at": "2024-12-05T18:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 414,
            "type": "high",
            "details": "Prepare a grocery list with essential items.",
            "created_at": "2024-12-01T09:00:00.000000Z",
            "updated_at": "2024-12-01T12:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 413,
            "type": "backlog",
            "details": "Organize workspace to minimize distractions.",
            "created_at": "2024-11-15T11:00:00.000000Z",
            "updated_at": "2024-11-16T15:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 412,
            "type": "low",
            "details": "Set reminders to drink water throughout the day.",
            "created_at": "2024-11-12T10:00:00.000000Z",
            "updated_at": "2024-11-12T18:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 411,
            "type": "high",
            "details": "Create a daily schedule for chores and appointments.",
            "created_at": "2024-11-10T09:00:00.000000Z",
            "updated_at": "2024-11-10T09:00:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": []
        },
        {
            "id": 410,
            "type": "high",
            "details": "Plan a weekend outing to recharge mentally.",
            "created_at": "2025-01-15T09:30:00.000000Z",
            "updated_at": "2025-01-15T09:30:00.000000Z",
            "status": "OPEN",
            "attachments": [],
            "comments": [
                {
                    "id": 11,
                    "comment": "Planning an outing helps reset and refresh, keeping productivity high.",
                    "created_at": "2025-01-15T09:45:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 409,
            "type": "backlog",
            "details": "Update the monthly budget spreadsheet.",
            "created_at": "2025-01-05T16:20:00.000000Z",
            "updated_at": "2025-01-05T16:20:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": [
                {
                    "id": 12,
                    "comment": "Tracking finances regularly ensures better money management and savings.",
                    "created_at": "2025-01-05T16:45:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 408,
            "type": "low",
            "details": "Declutter one drawer or shelf in the house.",
            "created_at": "2024-12-20T10:00:00.000000Z",
            "updated_at": "2024-12-20T10:00:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": [
                {
                    "id": 13,
                    "comment": "Decluttering creates a more organized and efficient living space.",
                    "created_at": "2024-12-20T10:15:00.000000Z",
                    "is_ai": true
                },
                {
                    "id": 144,
                    "comment": "I feel much easy knowing where everything is.",
                    "created_at": "2024-12-21T10:15:00.000000Z",
                    "is_ai": false
                }
            ]
        },
        {
            "id": 407,
            "type": "high",
            "details": "Set up a meal prep plan for the week.",
            "created_at": "2024-12-10T12:15:00.000000Z",
            "updated_at": "2024-12-10T12:15:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": [
                {
                    "id": 14,
                    "comment": "Meal prepping will save time and help keep a balanced diet throughout the week.",
                    "created_at": "2024-12-10T12:30:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 406,
            "type": "backlog",
            "details": "Sort through emails and archive old ones.",
            "created_at": "2024-12-05T15:00:00.000000Z",
            "updated_at": "2024-12-05T15:00:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": [
                {
                    "id": 15,
                    "comment": "Regularly sorting emails prevents inbox overload and reduces stress.",
                    "created_at": "2024-12-05T15:30:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 405,
            "type": "low",
            "details": "Write down three daily goals in a notebook.",
            "created_at": "2024-12-01T08:30:00.000000Z",
            "updated_at": "2024-12-01T08:30:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": [
                {
                    "id": 16,
                    "comment": "Setting daily goals improves focus and productivity.",
                    "created_at": "2024-12-01T08:45:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 404,
            "type": "high",
            "details": "Prepare a grocery list with essential items.",
            "created_at": "2024-11-20T17:45:00.000000Z",
            "updated_at": "2024-11-20T17:45:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": [
                {
                    "id": 17,
                    "comment": "Having a list makes grocery shopping faster and more efficient.",
                    "created_at": "2024-11-20T18:00:00.000000Z",
                    "is_ai": true
                }
            ]
        },
        {
            "id": 403,
            "type": "backlog",
            "details": "Organize workspace to minimize distractions.",
            "created_at": "2024-11-15T11:00:00.000000Z",
            "updated_at": "2024-11-15T11:00:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": []
        },
        {
            "id": 402,
            "type": "low",
            "details": "Set reminders to take breaks during long tasks.",
            "created_at": "2024-11-12T14:30:00.000000Z",
            "updated_at": "2024-11-12T14:30:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": []
        },
        {
            "id": 401,
            "type": "high",
            "details": "Create a daily schedule for chores and appointments.",
            "created_at": "2024-11-10T09:00:00.000000Z",
            "updated_at": "2024-11-10T09:00:00.000000Z",
            "status": "CLOSED",
            "attachments": [],
            "comments": []
        }
      ],
      "first_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
      "from": 1,
      "last_page": 1,
      "last_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
      "links": [
        {
          "url": null,
          "label": "pagination.previous",
          "active": false
        },
        {
          "url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "label": "1",
          "active": true
        },
        {
          "url": null,
          "label": "pagination.next",
          "active": false
        }
      ],
      "next_page_url": null,
      "path": "https://example.com/api/client/enquiries/getAllEnquiries",
      "per_page": "10",
      "prev_page_url": null,
      "to": 10,
      "total": 10
    }
  };
  let backlogData = {
        "success": true,
        "message": "success enquiries",
        "data": {
          "current_page": 1,
          "data": [...data.data.data.filter(itm => itm.type === 'backlog')],
          "first_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "from": 1,
          "last_page": 1,
          "last_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "links": [
            {
              "url": null,
              "label": "pagination.previous",
              "active": false
            },
            {
              "url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
              "label": "1",
              "active": true
            },
            {
              "url": null,
              "label": "pagination.next",
              "active": false
            }
          ],
          "next_page_url": null,
          "path": "https://example.com/api/client/enquiries/getAllEnquiries",
          "per_page": "10",
          "prev_page_url": null,
          "to": 10,
          "total": 10
        }
      };
      let highData = {
        "success": true,
        "message": "success enquiries",
        "data": {
          "current_page": 1,
          "data": [...data.data.data.filter(itm => itm.type === 'high')],
          "first_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "from": 1,
          "last_page": 1,
          "last_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "links": [
            {
              "url": null,
              "label": "pagination.previous",
              "active": false
            },
            {
              "url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
              "label": "1",
              "active": true
            },
            {
              "url": null,
              "label": "pagination.next",
              "active": false
            }
          ],
          "next_page_url": null,
          "path": "https://example.com/api/client/enquiries/getAllEnquiries",
          "per_page": "10",
          "prev_page_url": null,
          "to": 10,
          "total": 10
        }
      };
      let lowData = {
        "success": true,
        "message": "success enquiries",
        "data": {
          "current_page": 1,
          "data": [...data.data.data.filter(itm => itm.type === 'low')],
          "first_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "from": 1,
          "last_page": 1,
          "last_page_url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
          "links": [
            {
              "url": null,
              "label": "pagination.previous",
              "active": false
            },
            {
              "url": "https://example.com/api/client/enquiries/getAllEnquiries?page=1",
              "label": "1",
              "active": true
            },
            {
              "url": null,
              "label": "pagination.next",
              "active": false
            }
          ],
          "next_page_url": null,
          "path": "https://example.com/api/client/enquiries/getAllEnquiries",
          "per_page": "10",
          "prev_page_url": null,
          "to": 10,
          "total": 10
        }
      };
  if (type === 'backlog') {
    return backlogData;
  } else if (type === 'high') {
    return highData;
  } else if (type === 'low') {
    return lowData
  } else {
    return data;
  }
};

export default function useTask(type: string, id: string) {
  return useInfiniteQuery({
    queryKey: ['useTask' + type + id],
    queryFn: ({pageParam = 1}) => getTasks(type, pageParam, id),
    initialPageParam: {},
    getNextPageParam: (lastPage, pages) => {
      const page = pages.length + 1;
      const total = (page - 1) * 20;
      if (total >= lastPage?.data?.total) {
        return undefined;
      }
      return page;
    },
    // enabled: false, // Set this to false to disable this query from automatically running.
  });
}
