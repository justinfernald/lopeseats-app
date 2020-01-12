let data = {
    restaurants: [{
            title: "Panda Express",
            icon: "/pathToIcon.png",
            waitTime: 3, //in minutes
            cost: 7, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                relatedName: "Big Mac",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    specialInstructions: false,
                    options: [{
                            name: "Pickles",
                            default: "regular",
                            choices: {
                                "extra": {
                                    altName: "Extra Pickles",
                                    cost: 0
                                },
                                "none": {
                                    altName: "No Pickles",
                                    cost: 0
                                },
                                "regular": {
                                    altName: "Pickles",
                                    cost: 0
                                }
                            }
                        },
                        {
                            name: "Sauce",
                            default: "regular",
                            choices: {
                                "extra": {
                                    altName: "Extra Sauce",
                                    cost: 0
                                },
                                "none": {
                                    altName: "No Sauce",
                                    cost: 0
                                },
                                "regular": {
                                    altName: "Sauce",
                                    cost: 0
                                }
                            }
                        },
                        {
                            name: "Bun",
                            default: "yes",
                            choices: {
                                "yes": {
                                    altName: "Bun",
                                    cost: 0
                                },
                                "no": {
                                    altName: "No Bun",
                                    cost: 0
                                }
                            }
                        }
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }, {
                name: "Big Mac - Meal",
                relatedName: "Big Mac",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    specialInstructions: false,
                    options: [{
                            name: "Pickles",
                            default: "regular",
                            choices: {
                                "extra": {
                                    altName: "Extra Pickles",
                                    cost: 0
                                },
                                "none": {
                                    altName: "No Pickles",
                                    cost: 0
                                },
                                "regular": {
                                    altName: "Pickles",
                                    cost: 0
                                }
                            }
                        },
                        {
                            name: "Sauce",
                            default: "regular",
                            choices: {
                                "extra": {
                                    altName: "Extra Sauce",
                                    cost: 0
                                },
                                "none": {
                                    altName: "No Sauce",
                                    cost: 0
                                },
                                "regular": {
                                    altName: "Sauce",
                                    cost: 0
                                }
                            }
                        },
                        {
                            name: "Bun",
                            default: "yes",
                            choices: {
                                "yes": {
                                    altName: "Bun",
                                    cost: 0
                                },
                                "no": {
                                    altName: "No Bun",
                                    cost: 0
                                }
                            }
                        }
                    ]
                }, {
                    name: "French Fries",
                    tags: [],
                    nutrition: {},
                    specialInstructions: true, // could be like extra crispy or something idk
                    options: [{
                        name: "Salt",
                        default: "regular",
                        choices: {
                            "extra": {
                                altName: "Extra Salt",
                                cost: 0
                            },
                            "none": {
                                altName: "No Salt",
                                cost: 0
                            },
                            "regular": {
                                altName: "Salt",
                                cost: 0
                            }
                        }
                    }]
                }, {
                    name: "Beverage",
                    tags: [],
                    nutrition: {},
                    options: [{
                        name: "Drink Choice",
                        default: "Water",
                        choices: {
                            "Coca-Cola": {
                                altName: "Coca-Cola",
                                cost: 0
                            },
                            "Water": {
                                altName: "Water",
                                cost: 0,
                            },
                            "Mtn-Dew": {
                                altName: "Mountain Dew",
                                cost: 0
                            },
                            "Dr. Pepper": {
                                altName: "Dr. Pepper",
                                cost: 0
                            }
                        }
                    }, {
                        name: "Drink Size",
                        default: "Medium",
                        choices: {
                            "Small": {
                                altName: "Small Drink",
                                cost: 0
                            },
                            "Medium": {
                                altName: "Medium Drink",
                                cost: 0
                            },
                            "Large": {
                                altName: "Large Drink",
                                cost: .50
                            }
                        }
                    }]
                }]
            }]
        },
        {
            title: "Chick-fil-A",
            icon: "/pathToIcon.png",
            waitTime: 10, //in minutes
            cost: 5, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Pita Jungle",
            icon: "/pathToIcon.png",
            waitTime: 1, //in minutes
            cost: 9, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Subway",
            icon: "/pathToIcon.png",
            waitTime: 7, //in minutes
            cost: 8, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Auntie Anne's",
            icon: "/pathToIcon.png",
            waitTime: 1, //in minutes
            cost: 4, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Qdoba",
            icon: "/pathToIcon.png",
            waitTime: 9, //in minutes
            cost: 9, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Arena Cafe",
            icon: "/pathToIcon.png",
            waitTime: 15, //in minutes
            cost: 7, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Purple Greens",
            icon: "/pathToIcon.png",
            waitTime: 1, //in minutes
            cost: 8, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Fresh Fusion",
            icon: "/pathToIcon.png",
            waitTime: 2, //in minutes
            cost: 8, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "The Grid",
            icon: "/pathToIcon.png",
            waitTime: 2, //in minutes
            cost: 5, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Canyon Crepes",
            icon: "/pathToIcon.png",
            waitTime: 1, //in minutes
            cost: 8, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Canyon 49",
            icon: "/pathToIcon.png",
            waitTime: 10, //in minutes
            cost: 11, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
        {
            title: "Harvest Kitchen",
            icon: "/pathToIcon.png",
            waitTime: 3, //in minutes
            cost: 10, //average common mean price
            hours: {
                "Sunday": [],
                "Monday": [{
                        start: "8:00",
                        end: "11:00"
                    },
                    {
                        start: "12:00",
                        end: "22:00"
                    },
                ],
                "Tuesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Wednesday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Thursday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Friday": [{
                    start: "8:00",
                    end: "22:00"
                }, ],
                "Saturday": [{
                    start: "12:10",
                    end: "22:00"
                }, ],
            },
            food: [{
                name: "Big Mac - Entree",
                items: [{
                    name: "Big Mac",
                    tags: ["High Protein"],
                    nutrition: {
                        calories: 350,
                        sugar: 30,
                        fat: 30,
                    },
                    options: [{
                            name: "Pickles",
                            default: "none",
                            choices: ["none, extra, regular"]
                        },
                        {
                            name: "Pickles",
                            default: "none",
                            choices: [{
                                name: "extra",
                                cost: 0
                            }]
                        }
                        // pickles: [], // none, extra, regular
                        // sauce: [], // none, extra, regular
                        // bun: [], // yes, no 
                    ]
                }],
                price: 3.5,
                categories: ["Burgers"]
            }]
        },
    ],
};
console.log(data);