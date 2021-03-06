import os

YEAR_START = 1940
YEAR_END = 2016

years = range(YEAR_START, YEAR_END)

def make_template(year, year_range, year_range_short, year_range_short_pretty, rev_sort):
    return """---
layout: year
group: year
sort: """ + year + """
title: """ + year_range + """
year: \"""" + year_range_short + """\"
decade: \"""" + year[:3] + """\"
comment: The pages in this directory are automatically generated by the year_generator.py script. DO NOT manually edit them, your changes will be overwritten the next time the script runs.
editable: false
sitemap: false
---

{% assign shows = page.shows %}

{% include year_list.html %}

"""

for year in years:
  year_this = str(year) # 2012
  year_next = str(year+1) # 2013

  rev_sort = YEAR_END - year

  year_range = "{} - {}".format(year_this, year_next[2:]) # 2012 - 13
  year_range_short = "{}_{}".format(year_this[2:], year_next[2:])
  year_range_short_pretty = "{}-{}".format(year_this[2:], year_next[2:])
  content = make_template(str(year), year_range, year_range_short, year_range_short_pretty, str(rev_sort))

  filename = "_years/{}.html".format(year_range_short)
  stream = open(filename, "w")
  stream.write(content)
  stream.close()

