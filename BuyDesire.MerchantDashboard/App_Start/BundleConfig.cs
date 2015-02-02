using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace BuyDesire.MerchantDashboard
{
    public class BundleConfig
    {
        public static void SetIgnorePatterns(IgnoreList ignoreList)
        {
            ignoreList.Ignore("config.production.js", OptimizationMode.Always);
            ignoreList.Ignore("config.dev.js", OptimizationMode.Always);
            ignoreList.Ignore("config.test.js", OptimizationMode.Always);
            ignoreList.Ignore("*.bak.js", OptimizationMode.Always);
        }

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            SetIgnorePatterns(bundles.IgnoreList);

            var cssBundle = new Bundle("~/assets/style.css")
                .IncludeDirectory("~/assets/bundle/auto", "*.css", true)
                .IncludeDirectory("~/assets/bundle/auto", "*.less", true);
            cssBundle.Transforms.Add(new StyleTransformer());
            cssBundle.Orderer = new CustomBundleOrderer();
            bundles.Add(cssBundle);


            var script = new ScriptBundle("~/assets/libs.js").IncludeDirectory("~/assets/bundle/auto", "*.js", true);
            script.Orderer = new CustomBundleOrderer();
            bundles.Add(script);

            var spaScript = new ScriptBundle("~/assets/app.js").IncludeDirectory("~/app", "*.js", true);
            spaScript.Orderer = new CustomBundleOrderer();
            bundles.Add(spaScript);

            BundleTable.EnableOptimizations = bool.Parse(ConfigurationManager.AppSettings["EnableOptimizations"]);
        }
    }

    public class CustomBundleOrderer : IBundleOrderer
    {
        public virtual IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }
}