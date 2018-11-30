var j2c = require('json2csv'),
    fs = require('fs'),
    file = process.argv[2],
    _ = require('underscore'),
    fields = [ // EDIT THESE
        'postId',

        "heatmap_rv_q1",
        "time_diff_dimpvis_heatmap_rv_q1",
        "heatmap_rv_q2",
        "time_diff_dimpvis_heatmap_rv_q2",
        "heatmap_rv_q3",
        "time_diff_dimpvis_heatmap_rv_q3",

        "heatmap_cd_q1",
        "time_diff_dimpvis_heatmap_cd_q1",
        "heatmap_cd_q2",
        "time_diff_dimpvis_heatmap_cd_q2",
        "heatmap_cd_q3",
        "time_diff_dimpvis_heatmap_cd_q3",

        "heatmap_od_q1",
        "time_diff_dimpvis_heatmap_od_q1",
        "heatmap_od_q2",
        "time_diff_dimpvis_heatmap_od_q2",
        "heatmap_od_q3",
        "time_diff_dimpvis_heatmap_od_q3",

        "heatmap_co_q1",
        "time_diff_dimpvis_heatmap_co_q1",
        "heatmap_co_q2",
        "time_diff_dimpvis_heatmap_co_q2",
        "heatmap_co_q3",
        "time_diff_dimpvis_heatmap_co_q3",
    ],
    data

fs.readFile(file, 'utf8', function(err, data) {
    if (err) console.log(err)

    data = JSON.parse(data)

    // filters any undefined data (it makes R scripting easier)
    data = filterUndefined(data)

    // use 'debug' for your workerId when testing experiments,
    //   comment out if you want to analyze data from yourself
    data = filterDebug(data)

    convert(data)
})

function convert(d) {
    var params = {
        data: d,
        fields: fields
    }
    j2c(params, function(err, csv) {
        if (err) console.log(err)
        console.log(csv)
    })
}

function filterUndefined(arr) {
    return _.filter(arr, function(row) {
        return _.every(fields, function(f) { return row[f] })
    })
}

function filterDebug(arr) {
    return _.filter(arr, function(row) {
        return row.workerId !== 'debug'
    })
}