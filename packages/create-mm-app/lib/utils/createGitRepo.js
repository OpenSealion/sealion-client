const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');
function isInGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
function isInMercurialRepository() {
    try {
        execSync('hg --cwd . root', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
function tryGitInit() {
    try {
        execSync('git --version', { stdio: 'ignore' });
        if (isInGitRepository() || isInMercurialRepository()) {
            return false;
        }
        execSync('git init', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        console.warn('Git repo not initialized', e);
        return false;
    }
}
function tryGitCommit(appPath) {
    try {
        execSync('git add -A', { stdio: 'ignore' });
        execSync('git commit -m "Initialize project using Create MM App"', {
            stdio: 'ignore'
        });
        return true;
    }
    catch (e) {
        // We couldn't commit in already initialized git repo,
        // maybe the commit author config is not set.
        // In the future, we might supply our own committer
        // like Ember CLI does, but for now, let's just
        // remove the Git files to avoid a half-done state.
        console.warn('Git commit not created', e);
        console.warn('Removing .git directory...');
        try {
            // unlinkSync() doesn't work on directories.
            fs.removeSync(path.join(appPath, '.git'));
        }
        catch (removeErr) {
            // Ignore.
        }
        return false;
    }
}
module.exports = {
    tryGitInit,
    tryGitCommit
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlR2l0UmVwby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVHaXRSZXBvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbkQsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixTQUFTLGlCQUFpQjtJQUN0QixJQUFJO1FBQ0EsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckUsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBRUQsU0FBUyx1QkFBdUI7SUFDNUIsSUFBSTtRQUNBLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNmLElBQUk7UUFDQSxRQUFRLENBQUMsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxpQkFBaUIsRUFBRSxJQUFJLHVCQUF1QixFQUFFLEVBQUU7WUFDbEQsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBRSxPQUFPO0lBQzFCLElBQUk7UUFDQSxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDNUMsUUFBUSxDQUFDLHdEQUF3RCxFQUFFO1lBQy9ELEtBQUssRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLHNEQUFzRDtRQUN0RCw2Q0FBNkM7UUFDN0MsbURBQW1EO1FBQ25ELCtDQUErQztRQUMvQyxtREFBbUQ7UUFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDM0MsSUFBSTtZQUNBLDRDQUE0QztZQUM1QyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFBQyxPQUFPLFNBQVMsRUFBRTtZQUNoQixVQUFVO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsVUFBVTtJQUNWLFlBQVk7Q0FDZixDQUFDIn0=